import { Buffer } from 'buffer';
import MQTT from 'paho-mqtt';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Config } from '../../Config';
import Logger, { LogLevel } from '../Logger';
const CBOR = require('cbor-js');

var logger = new Logger('PROPHET', true, LogLevel.Trace);

interface RestorePoint {
  action: 'sub';
  topic: string;
  data?: any;
}

export enum ConnectionState {
  Connecting,
  Reconnecting,
  Connected,
  Disconnected,
  Failed,
}

interface Event {
  type?: 'error' | 'message' | 'status';
}
export interface ErrorEvent extends Event {
  actualError: any;
}

export interface MessageEvent extends Event {
  topic: string;
  data: any;
}

export interface StatusEvent extends Event {
  fromHealthCheck: boolean;
  status: ConnectionState;
  name: string;
}
interface TopicSubscription {
  topic: string;
  subscription: Subscription;
}

export function randomInt(min: number, max: number) {
  return Math.trunc(min + Math.random() * (max - min));
}

export class Prophet {
  private static _instance: Prophet | null = null;
  private _mqttClient: MQTT.Client;
  private _clientId: string;
  private _secret?: string;
  private _restorePoints: RestorePoint[];
  private _events: Subject<any>;
  private _connectivityHealthCheckTimer: NodeJS.Timeout;
  private _connectivityHealthRecoveryTimer: NodeJS.Timeout;
  private _topicSubscription: TopicSubscription[];
  private _connectionState: ConnectionState;

  public static getInstance(clientId: string = 'unknown'): Prophet {
    if (Prophet._instance == null) {
      Prophet._instance = new Prophet(Config.MQTT_HOST, Config.MQTT_PORT, clientId);
    }
    return Prophet._instance as Prophet;
  }

  constructor(host: string, port: number, clientId: string) {
    this._mqttClient = new MQTT.Client(host, 'user' + clientId + '/' + randomInt(100, 999));
    this._mqttClient;
    this._mqttClient.onConnectionLost = this._handleOnConnectionLost;
    this._mqttClient.onMessageArrived = this._handleOnMessageArrived;
    this._clientId = '';
    if (clientId != 'unknown') {
      this._clientId = clientId;
    }
    this._restorePoints = [];
    this._events = new Subject<any>();
    this._topicSubscription = [];
  }

  private _emitStatus(status: ConnectionState, fromHealthCheck = false) {
    this._events.next({
      type: 'status',
      status,
      name: ConnectionState[status],
      fromHealthCheck,
    });

    if (this._connectionState != status) {
      this._connectionState = status;
      logger.debug('status changed, new status =', ConnectionState[status]);
    }
  }

  private _emitError(error: ErrorEvent) {
    error.type = 'error';
    this._events.next(error);
  }

  private _emitMessage(message: MessageEvent) {
    message.type = 'message';

    this._events.next(message);
  }

  private _handleOnMessageArrived: MQTT.OnMessageHandler = (message: MQTT.Message) => {
    let data: string | ArrayBuffer;

    try {
      const buffer = new ArrayBuffer(message.payloadBytes.byteLength);
      const dataView = new DataView(buffer);
      for (let i = 0; i < buffer.byteLength; i++) {
        dataView.setUint8(i, (message.payloadBytes as any)[i]);
      }
      data = CBOR.decode(buffer);
    } catch (e) {
      logger.debug('data was not cbor, return ArrayBuffer');
      data = message.payloadBytes;
    }
    this._emitMessage({
      topic: message.destinationName,
      data: data,
    });

    logger.info(`data received for topic ${message.destinationName}`);
  };

  private _handleOnConnectionLost: MQTT.OnConnectionLostHandler = (error: MQTT.MQTTError) => {
    logger.debug('connection lost', error.errorCode, error.errorMessage);

    // if (error.errorCode == 8) {
    this.startConnectivityHealthRecovery();
    // }
    this._emitError({ actualError: error });
  };

  private startConnectivityHealthRecovery() {
    clearInterval(this._connectivityHealthRecoveryTimer);

    logger.debug('start connectivity health recovery');
    const connectivityHealthRecovery = async () => {
      logger.debug('trying to recover connectivity status');

      if (
        this._connectionState == ConnectionState.Reconnecting ||
        this._connectionState == ConnectionState.Connecting
      ) {
        return;
      }

      if (this._connectionState == ConnectionState.Connected) {
        logger.debug('client is connected, remove recovery interval');
        clearInterval(this._connectivityHealthRecoveryTimer);
        return;
      }

      await this._reconnect();
    };

    this._connectivityHealthRecoveryTimer = setInterval(connectivityHealthRecovery, 5000);
  }

  private startConnectivityHealthCheckTimer() {
    clearInterval(this._connectivityHealthCheckTimer);

    const emitter = () => {
      this._emitStatus(
        this._mqttClient.isConnected() ? ConnectionState.Connected : ConnectionState.Disconnected,
        true,
      );
    };

    this._connectivityHealthCheckTimer = setInterval(emitter, 5000);
  }

  private _handleConnect(username: string, secret: string, isReconnecting: boolean = false) {
    return new Promise<ConnectionState>((resolve, reject) => {
      if (isReconnecting) {
        this._emitStatus(ConnectionState.Reconnecting);
      } else this._emitStatus(ConnectionState.Connecting);

      if (this._mqttClient.isConnected() && this._clientId == username && this._secret == secret) {
        this._emitStatus(ConnectionState.Connected);
        resolve(ConnectionState.Connected);
        return;
      } else if (this._mqttClient.isConnected()) {
        this._disconnect();
      }
      clearInterval(this._connectivityHealthCheckTimer);
      logger.debug({ userName: username + '', password: secret + '' });
      this._secret = secret;
      this._clientId = username;

      this._mqttClient.connect({
        timeout: 8,
        userName: username + '',
        password: secret + '',
        onSuccess: () => {
          logger.info('Mqtt connected');
          this._emitStatus(ConnectionState.Connected);
          this.startConnectivityHealthCheckTimer();
          resolve(ConnectionState.Connected);
        },
        onFailure: e => {
          logger.error('Mqtt connection failed ', e);
          this.startConnectivityHealthRecovery();
          this._emitStatus(ConnectionState.Failed);
          reject(ConnectionState.Failed);
        },
      });
    });
  }

  private _disconnect() {
    if (this._mqttClient.isConnected()) {
      this._emitStatus(ConnectionState.Disconnected);
      this._mqttClient.disconnect();
    }
  }

  private _recoverConnectionState() {
    logger.debug('recovering connection status', this._restorePoints);

    this._restorePoints.forEach(value => {
      if (value.action == 'sub') {
        logger.debug('recovering connection state, subscribing', value.topic);
        this.subscribe(value.topic, true);
      }
    });
  }

  private async _reconnect(): Promise<ConnectionState> {
    try {
      this._disconnect();

      if (this._secret) {
        logger.debug('start reconnecting');
        const status = await this._handleConnect(this._clientId, this._secret, true);
        logger.debug('reconnecting done, is successful?', status == ConnectionState.Connected);
        if (status == ConnectionState.Connected) {
          this._recoverConnectionState();
        }
        return status;
      } else throw Error('Cannot remember secret.');
    } catch (error) {
      logger.info('reconnection failed');
      return ConnectionState.Failed;
    }
  }

  private _toBuffer(ab: any) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
    }
    return buf;
  }

  private subscribe(topic: string, recovering: boolean = false): Prophet {
    const convertedTopic = topic.replace(/\./gm, '/');

    if (!recovering) {
      this._restorePoints.push({
        action: 'sub',
        topic: convertedTopic,
      });
    }

    if (this._mqttClient.isConnected()) {
      this._mqttClient.subscribe(convertedTopic, {
        qos: 1,
      });
      logger.debug('subscribed to: ', convertedTopic);
    } else {
      logger.debug('not connected, save subscription for topic', convertedTopic);
    }

    return this;
  }

  private unsubscribe(topic: string, ...ref: Subscription[]): Prophet {
    if (ref) {
      ref.map(x => x.unsubscribe());
    }
    if (this._mqttClient.isConnected()) {
      this._mqttClient.unsubscribe(topic);
    }
    this._restorePoints.map((value, index, arr) => {
      if (value.action == 'sub' && value.topic == topic) {
        arr.splice(index, 1);
      }
    });

    logger.debug(`unsubscribe from ${topic}`);
    return this;
  }

  public onStatus(): Observable<StatusEvent> {
    return this._events.pipe(filter(value => value.type == 'status'));
  }

  public disconnect() {
    this._disconnect();
  }

  public send(topic: string, data: Object, recovering: boolean = false): Prophet {
    const convertedTopic = topic.replace(/\./gm, '/');

    if (this._mqttClient.isConnected()) {
      let bufferedData = this._toBuffer(CBOR.encode(data));
      this._mqttClient.send(convertedTopic, bufferedData, 1);
      logger.debug('sending data', convertedTopic, data);
    } else {
      // fallback silently
    }
    return this;
  }

  public onError(): Observable<ErrorEvent> {
    return this._events.pipe(filter(value => value.type == 'error'));
  }

  public onMessage(): Observable<MessageEvent> {
    return this._events.pipe(filter(value => value.type == 'message'));
  }

  public reconnect(): Promise<ConnectionState> {
    return this._reconnect();
  }

  public connect(username: string, secret: string): Promise<ConnectionState> {
    return this._handleConnect(username, secret);
  }

  public listenTo(topic: string | undefined, callback: (e: MessageEvent) => void): Prophet {
    if (topic == '' || topic == undefined) return this;
    const convertedTopic = topic.replace(/\./gm, '/');
    const subscription = this._events
      .pipe(filter(value => value.type == 'message' && value.topic == convertedTopic))
      .subscribe({
        next: x => {
          callback(x);
        },
      });
    this.subscribe(convertedTopic);
    this._topicSubscription.push({ topic: convertedTopic, subscription });
    return this;
  }

  public clean(topic: string): Prophet {
    this._topicSubscription
      .filter(x => x.topic == topic)
      .forEach(({ subscription }, index) => {
        subscription.unsubscribe();
        this._topicSubscription.splice(index, 1);
      });
    const topics = this._topicSubscription.filter(x => x.topic == topic);
    if (topics != null && topics) {
      if (topics.length == 0) {
        this.unsubscribe(topic);
      }
    }

    return this;
  }

  public cleanAll() {
    this._topicSubscription.forEach(({ subscription, topic }, index) => {
      this.unsubscribe(topic);
      subscription.unsubscribe();
    });
    this._topicSubscription = [];
    return this;
  }
}
