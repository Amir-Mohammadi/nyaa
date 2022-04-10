import { encode } from 'base-64';
import { action, computed, observable } from 'mobx';
import { ToastAndroid } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { sha1 } from 'react-native-sha1';
import uuid from 'react-native-uuid';
import api from '../api';
import { DeviceListNode, Topic, User } from '../api/models';
import { DeviceTypeProperties, DeviceTypes } from '../constants/DeviceTypes';
import Logger from '../utils/Logger';
import { DeviceStatus } from '../utils/models';
import { Prophet } from '../utils/mqtt/Prophet';
import SignatureToTopic from '../utils/mqtt/SignatureToTopic';
import CameraHandler from '../utils/services/CameraHandler';
import { DeviceProperties } from '../utils/services/DevicePropertiesService';
import { DeviceStaticStatusBar, ERRORS } from '../utils/StaticValues';
import Throttle from '../utils/throttle';
import { showToastAndroid } from '../utils/ToastAndroidHandler';
import { Store } from './core/Store';

export interface DeviceStatusMessage {
  ssid: string;
  ap_mac_address: string;
  mac_address: string;
  status: 'online' | 'offline';
  ip: string;
}

var logger = new Logger('MenuStore');
var mqttLogger = new Logger('MQTT', false);

type TemperatureRange = {
  start: number;
  end: number;
};

export interface RPC {
  method: string;
  params: {
    resource: string;
    value?: string | number;
    identifier: string;
  };
}

export interface ErrorShowList {
  key: string;
  subValue: string;
  type: string;
  title: string;
  buttonText: string;
  action: Function;
}

enum cameraType {
  SingleCamera,
  MultiCamera,
}

const THROTTLE_BETWEEN_EACH_RPC = 500;
const RPC_TIMEOUT = 8000;
const WAIT_BEFORE_SEND_TEMPERATURE_RPC = 700;

export class MenuStore extends Store {
  throttle: Throttle = new Throttle(THROTTLE_BETWEEN_EACH_RPC);
  errorMessageThrottle: Throttle = new Throttle(RPC_TIMEOUT);
  signatureToTopic: SignatureToTopic;
  mqtt: Prophet = Prophet.getInstance();
  _user?: User;
  _fridgeTempTopic?: string;
  _freezerTempTopic?: string;
  _displayTopic?: string;
  _multiMediaTopic?: string;
  _rpc?: string;
  _deviceOnTopic?: string;
  _username?: string;
  _password?: string;
  _errorTopic?: string;
  private _singleCameraTopic?: string;
  private _firstCameraTopic: string | undefined;
  private _secondCameraTopic: string | undefined;
  private _thirdCameraTopic: string | undefined;
  private _loadedOnline: boolean = false;
  private lastValidFridgeTemp: number = 4;
  private lastValidFreezerTemp: number = -17;
  private freezerTimer: NodeJS.Timeout;
  private fridgeTimer: NodeJS.Timeout;
  private fridgeTempTimer: NodeJS.Timeout;
  private freezerTempTimer: NodeJS.Timeout;
  private _firstCameraCounterTopic: string | undefined;
  private _secondCameraCounterTopic: string | undefined;
  private _thirdCameraCounterTopic: string | undefined;
  private _singleCameraCounterTopic: string | undefined;
  @observable animateFreezerTemperature: boolean = false;
  @observable animateFridgeTemperature: boolean = false;
  private _rpcResult: string | undefined;

  @computed get isUserHaveAtLeastOneDevice(): boolean {
    return this.listOfDevices.length !== 0;
  }

  @action changeDeviceType(typeName: DeviceTypes) {
    if (DeviceTypeProperties[typeName]) {
      this.deviceType = typeName;
    }
  }
  rpcList = new Map<string, NodeJS.Timeout>();

  sendRPC(
    method: string,
    resource: string,
    options?: { value?: string | number; silence?: boolean },
  ) {
    this.throttle.send(() => {
      if (!this.mqtt || !this._rpc) return;

      try {
        const identifier = uuid.v4();

        const rpc: RPC = {
          method: method,
          params: {
            resource: resource,
            identifier: identifier,
            ...(options?.value && { value: options.value }),
          },
        };
        this.mqtt.send(this._rpc!, rpc);

        if (options?.silence) return;

        this.errorMessageThrottle.send(() => {
          var timeOurId = setTimeout(() => {
            showToastAndroid('پاسخی از دستگاه دریافت نشد', ToastAndroid.SHORT);
          }, RPC_TIMEOUT);

          this.rpcList.set(identifier, timeOurId);
        });
      } catch (e) {
        logger.error('send rpc fails', e);
      }

      ReactNativeHapticFeedback.trigger('impactHeavy', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
    });
  }

  initializeButtonMenu() {
    var deviceStatus: DeviceStatus[] = [];
    DeviceStaticStatusBar.forEach(element => {
      if (this.buttonMenuItems.includes(element.signature)) {
        deviceStatus.push(element);
      }
    });
    this.deviceStatus = deviceStatus;
  }

  @observable errorShowList: ErrorShowList[] = [];
  @observable imageList: {
    uri?: string;
    dimensions?: { width: number; height: number };
  }[] = [];
  @observable noDevice: boolean = false;
  @observable isDeviceOn: boolean = true;
  @observable fridgeTemperatureValue: number = 4;
  @observable freezerTemperatureValue: number = -17;
  @observable selectedMediaMode: number = 0;
  @observable isDisplayOn: boolean = true;
  @observable deviceStatus: DeviceStatus[] = [
    {
      signature: 'core.parlar.ReadonlyBool.freezer_door',
      icon: 'opendoor',
      text: 'Freezer Door',
      toggle: false,
    },
    {
      signature: 'core.parlar.ReadonlyBool.fridge_door',
      icon: 'opendoor',
      text: 'Fridge Door',
      toggle: false,
    },
  ];
  @observable selectedDevice: number = 0;

  @observable fridgeRange: TemperatureRange = {
    start: 1,
    end: 6,
  };
  @observable freezerRange: TemperatureRange = {
    start: -25,
    end: -17,
  };

  @observable listOfDevices: DeviceListNode[] = [];
  @observable deviceType: DeviceTypes = 'emersun-smart';
  @observable overlayScreenMessage: string = '';
  @computed get upperMenuPages() {
    return DeviceTypeProperties[this.deviceType].upperMenu;
  }
  @computed get buttonMenuItems() {
    return DeviceTypeProperties[this.deviceType].buttonMenu;
  }

  private overlayScreenMessageTimeout: NodeJS.Timeout;

  @action async initialize() {
    logger.debug('initializing');

    this.overlayScreenMessageTimeout = setTimeout(() => {
      this.overlayScreenMessage = 'در حال بارگیری اطلاعات';
    }, 300);

    this.initializeButtonMenu();

    this.getUserDevices(); //works online or offline, get user
    this.selectedDevice = await global.services.devicesService.getCurrentDeviceIndexOrDefault(); // works online or offline
    await this.connectToMqtt(); // works online or offline
    this.listenToUserTopic();

    if (!this.noDevice) {
      this.setSelectedDevice(this.selectedDevice);
    }

    clearTimeout(this.overlayScreenMessageTimeout);
    this.overlayScreenMessage = '';
  }

  notifyUserAfterChangeShared(topic: string) {
    if (!this.mqtt) return;

    this.mqtt.send(topic, '');
  }

  isInternetConnected() {
    return global.stores.connection.isInternetReachable && global.stores.connection.isConnect;
  }

  // async loadOnline() {
  //   logger.debug('loading online');
  //   await this.getUserDevices();
  //   logger.debug('get User Devices done');
  //   this.selectedDevice = await global.services.devicesService.getCurrentDeviceIndexOrDefault();
  //   await this.connectToMqtt();
  //   this.listenToUserTopic();

  //   if (!this.noDevice) {
  //     this.setSelectedDevice(this.selectedDevice);
  //   }
  // }

  async getUserDevices() {
    try {
      this._user = await global.services.userService.getUser();
      const devices = await global.services.devicesService.getDevices();

      if (!devices) {
        this.userHasNoDevice(true);
        return;
      }

      global.services.devicesService.listenToDevicesUpdate(devices => {
        this.applyDevicesToUi(devices);
        this.userHasNoDevice(devices.length == 0);
      });

      this.applyDevicesToUi(devices);
      this.userHasNoDevice(devices.length == 0);
    } catch (error) {
      logger.error('get Device: ', error);
      throw error;
    }
  }

  deviceChangeListener(devices: DeviceListNode[]) {
    if (!devices) return;

    this.applyDevicesToUi(devices);
  }

  applyDevicesToUi(devices: DeviceListNode[]) {
    var listOfDevices: DeviceListNode[] = [];
    devices.forEach(device => {
      listOfDevices.push(device);
    });
    logger.debug('loading devices done');
    this.listOfDevices = listOfDevices;
  }

  // async loadOffline() {
  //   logger.debug('loading offlineDevices');
  //   const devices = await AsyncStorage.getItem(AsyncStoreKeys.LIST_OF_DEVICES);
  //   const user = await AsyncStorage.getItem(AsyncStoreKeys.USER);
  //   this._user = JSON.parse(user || '{}');
  //   this.listOfDevices = JSON.parse(devices || '[]');

  //   this.userHasNoDevice(this.listOfDevices.length == 0);

  //   this.selectedDevice = await global.services.devicesService.getCurrentDeviceIndexOrDefault();

  //   if (!this.noDevice) {
  //     this.setSelectedDevice(this.selectedDevice);
  //   }
  // }

  async reloadMenuStore() {
    logger.debug('reloading menu store');
    this.requestFullDataFromDevice();
    global.services.devicesService.loadDevicesOnline();
    global.services.userService.loadUserOnline();
  }

  onInternetBackOnline() {
    this.reloadMenuStore();
  }

  requestFullDataFromDevice() {
    logger.debug('request Full Data From Device');
    this.sendRPC('events', 'clientConnect', { silence: true });
  }

  setDeviceAlive(deviceIsAlive: boolean) {
    if (deviceIsAlive) {
      this.isDeviceOn = true;
      this.overlayScreenMessage = '';
    } else {
      this.isDeviceOn = false;
      this.overlayScreenMessage = 'یخچال انتخابی شما خاموش می‌باشد یا به اینترنت متصل نیست';
    }
  }

  @action visualizeErrors(errors: string[]) {
    var errorList: ErrorShowList[] = [];

    errors.forEach(mqttErrorKey => {
      try {
        let _key = mqttErrorKey.toLowerCase();
        if (ERRORS[_key] != undefined) {
          errorList.push({
            key: mqttErrorKey.toLowerCase(),
            subValue: ERRORS[_key].subValue,
            type: 'ExpaindableItem',

            title: `${ERRORS[_key].title} (${mqttErrorKey})`,
            buttonText: 'تماس با واحد خدمات',
            action: () => {},
          });
        }
      } catch (e) {
        logger.error('error list problem', e);
      }
    });
    this.errorShowList = errorList;
  }

  @action userHasNoDevice(flag: boolean) {
    this.noDevice = flag;
  }

  async creatCredential() {
    if (!this._user) return;

    this._username = this._user.client_id.toString();
    var privateKey = this._user.privatekey;
    var nationalCode = this._user.national_code;
    var phone = this._user.phone;
    await sha1(`${privateKey}${nationalCode}${phone}`).then((hash: string) => {
      this._password = encode(hash.toLowerCase());
    });
    console.log('user credential:', privateKey, nationalCode, phone);
  }

  async connectToMqtt() {
    try {
      if (!this._user || this._user == null) return;

      await this.creatCredential();
      try {
        await this.mqtt.connect(this._username!, this._password!);
      } catch (error) {
        logger.error('connect To Mqtt', error);
      }
    } catch (error) {
      logger.error('connect To Mqtt', error);
    }
  }

  configuringMqtt() {
    if (!this.mqtt || this.mqtt == null) return;

    try {
      this.mqtt.cleanAll();
      this.setTopics();
      this.subscribeToTopics();
    } catch (error) {
      logger.error('configuring Mqtt', error);
    }
  }

  listenToUserTopic() {
    if (!this.mqtt) return;

    const userTriggerTopic = this.getUserTriggerTopic();

    this.mqtt.listenTo(userTriggerTopic, async () => {
      logger.debug('MQTT, user trigger reload');
      global.services.devicesService.loadDevicesOnline();
      // this.initialize();
    });
  }

  setTopics(): void {
    this._fridgeTempTopic = this.signatureToTopic.getTopic(
      'core.parlar.SettableNumber.fridge_temp',
    );
    this._freezerTempTopic = this.signatureToTopic.getTopic(
      'core.parlar.SettableNumber.freezer_temp',
    );
    this._displayTopic = this.signatureToTopic.getTopic('core.parlar.ToggleableBool.power');
    this._multiMediaTopic = this.signatureToTopic.getTopic('emersun.SimpleMultiMedia.multi_media');
    this._deviceOnTopic = this.signatureToTopic.getTopic('core.parlar.ReadonlyBool.on');
    this._errorTopic = this.signatureToTopic.getTopic('core.parlar.ReadonlyList.errors');
    this._rpc = this.signatureToTopic.getTopic('sys.rpc.rpc');
    this._rpcResult = this.signatureToTopic.getTopic('sys.rpcResult.rpcResult');
    this._singleCameraTopic = this.signatureToTopic.getTopic('emersun.camera');
    this._firstCameraTopic = this.signatureToTopic.getTopic('emersun.camera1');
    this._secondCameraTopic = this.signatureToTopic.getTopic('emersun.camera2');
    this._thirdCameraTopic = this.signatureToTopic.getTopic('emersun.camera3');
    this._singleCameraCounterTopic = this.signatureToTopic.getTopic(
      'core.parlar.ReadonlyNumber.camera_counter',
    );
    this._firstCameraCounterTopic = this.signatureToTopic.getTopic(
      'core.parlar.ReadonlyNumber.camera1_counter',
    );
    this._secondCameraCounterTopic = this.signatureToTopic.getTopic(
      'core.parlar.ReadonlyNumber.camera2_counter',
    );
    this._thirdCameraCounterTopic = this.signatureToTopic.getTopic(
      'core.parlar.ReadonlyNumber.camera3_counter',
    );
  }

  subscribeToTopics() {
    if (!this.mqtt) return;

    this.mqtt.onMessage().subscribe(() => {
      var device = this.listOfDevices[this.selectedDevice];
      if (!device.id) return;
      this.saveDeviceProperties(device.id);
    });

    this.mqtt.listenTo(this._rpcResult, message => {
      const data: RPC = message.data;
      if (!data.params.identifier) return;

      const timeoutId = this.rpcList.get(data.params.identifier);
      clearTimeout(timeoutId!);
      mqttLogger.info('rpcResult: ', message.data);
    });

    this.mqtt.listenTo(this._fridgeTempTopic, message => {
      var fridgeTemperatureValue = Number(message.data);
      if (
        fridgeTemperatureValue <= this.fridgeRange.end &&
        fridgeTemperatureValue >= this.fridgeRange.start
      ) {
        this.lastValidFridgeTemp = fridgeTemperatureValue;
        this.fridgeTemperatureValue = this.lastValidFridgeTemp;
        this.animateFridgeTemperature = false;
      }
      mqttLogger.info('fridge_temp: ', message.data);
    });

    this.mqtt.listenTo(this._freezerTempTopic, message => {
      var freezerTemperatureValue = Number(message.data);
      if (
        freezerTemperatureValue <= this.freezerRange.end &&
        freezerTemperatureValue >= this.freezerRange.start
      ) {
        this.lastValidFreezerTemp = freezerTemperatureValue;
        this.freezerTemperatureValue = this.lastValidFreezerTemp;
        this.animateFreezerTemperature = false;
      }
      mqttLogger.info('freezer_temp: ', message.data);
    });

    this.mqtt.listenTo(this._displayTopic, message => {
      this.isDisplayOn = message.data;
      mqttLogger.info('On: ', message.data);
    });

    this.mqtt.listenTo(this._multiMediaTopic, message => {
      if (!message.data[0]) {
        mqttLogger.info('multi media: off');
        this.selectedMediaMode = 0;
      } else {
        if (message.data[1]) {
          mqttLogger.info('multi media: mp3');
          this.selectedMediaMode = 1;
        } else {
          mqttLogger.info('multi media: radio');
          this.selectedMediaMode = 2;
        }
      }
    });

    this.mqtt.listenTo(this._deviceOnTopic, message => {
      mqttLogger.info('MQTT, device on: ', message.data);

      try {
        const deviceStatus = JSON.parse(message.data) as DeviceStatusMessage;
        if (deviceStatus.status == 'offline') {
          this.setDeviceAlive(false);
        } else {
          this.setDeviceAlive(true);
        }
      } catch (e) {
        logger.error(e);
      }
    });

    this.mqtt.listenTo(this._errorTopic, message => {
      mqttLogger.info('error list: ', message.data);
      this.visualizeErrors(message.data);
    });

    this.deviceStatus.forEach(element => {
      try {
        var topic = this.signatureToTopic.getTopic(element.signature as any);
        this.mqtt!.listenTo(topic, message => {
          if (element.toggle != message.data) {
            element.toggle = message.data;
            var deviceStatus = [...this.deviceStatus];
            this.deviceStatus = deviceStatus;
          }
          mqttLogger.info(element.text, message.data);
        });
      } catch (error) {
        logger.error;
      }
    });
    this.mqtt.listenTo(this._singleCameraCounterTopic, message => {
      mqttLogger.info('MQTT, picture has come');
      this.catchCameraHandler(this._singleCameraTopic, message.data, cameraType.SingleCamera);
    });
    this.mqtt.listenTo(this._firstCameraCounterTopic, message => {
      mqttLogger.info('MQTT, picture has come');
      this.catchCameraHandler(this._firstCameraTopic, message.data, cameraType.MultiCamera, 0);
    });
    this.mqtt.listenTo(this._secondCameraCounterTopic, message => {
      mqttLogger.info('MQTT, picture has come');
      this.catchCameraHandler(this._secondCameraTopic, message.data, cameraType.MultiCamera, 1);
    });
    this.mqtt.listenTo(this._thirdCameraCounterTopic, message => {
      mqttLogger.info('MQTT, picture has come');
      this.catchCameraHandler(this._thirdCameraTopic, message.data, cameraType.MultiCamera, 2);
    });
    this.listenToUserTopic();
  }

  async catchCameraHandler(
    cameraTopic: string | undefined,
    counter: string,
    type: cameraType,
    cameraIndex: number = 0,
  ) {
    if (cameraTopic === undefined) return;
    var device = this.listOfDevices[this.selectedDevice];
    let cameraHandler = new CameraHandler(cameraTopic, device.id, cameraIndex);
    if (type === cameraType.SingleCamera) {
      let data = await cameraHandler.getPicture(Number(counter));
      this.setSingleCameraPicture(data);
    } else if (type === cameraType.MultiCamera) {
      let data = await cameraHandler.getPicture(Number(counter));
      this.setMultipleCameraPicture(data, cameraIndex);
    }
  }

  @action setSingleCameraPicture(data: string) {
    this.imageList = [
      {
        uri: 'data:image/jpeg;base64,' + data,
        dimensions: { width: 800, height: 600 },
      },
    ];
  }

  @action setMultipleCameraPicture(data: string, index: number) {
    let tempImageList = [...this.imageList];
    tempImageList.splice(index, 1, {
      uri: 'data:image/jpeg;base64,' + data,
      dimensions: { width: 800, height: 600 },
    });
    this.imageList = tempImageList;
  }

  @action async initializeSignatureToTopic() {
    try {
      var device = this.listOfDevices[this.selectedDevice];
      this.signatureToTopic = new SignatureToTopic(
        device.id,
        device.type.name,
        device.type.version,
      );
    } catch (error) {
      logger.error('initialize Signature To Topic: ', error);
    }
  }

  async getFocusedDeviceTopics() {
    var typeId = this.listOfDevices[this.selectedDevice].type.id;
    var topics: Topic[] = [];
    try {
      topics = await api.v1.device.topics(typeId);
    } catch (error) {
      logger.error('Get Topics: ', error);
    } finally {
      return topics;
    }
  }

  // --------------- fridge ------------------------

  resetFridgeTimer() {
    this.animateFridgeTemperature = true;
    if (this.fridgeTimer) {
      clearTimeout(this.fridgeTimer);
    }
    this.fridgeTimer = setTimeout(() => {
      this.animateFridgeTemperature = false;
      logger.debug('reset Fridge Timer');
      this.fridgeTemperatureValue = this.lastValidFridgeTemp;
    }, RPC_TIMEOUT + 2000);
  }

  resetFreezerTimer() {
    this.animateFreezerTemperature = true;
    if (this.freezerTimer) {
      clearTimeout(this.freezerTimer);
    }
    this.freezerTimer = setTimeout(() => {
      this.animateFreezerTemperature = false;
      logger.debug('reset Freezer Timer');
      this.freezerTemperatureValue = this.lastValidFreezerTemp;
    }, RPC_TIMEOUT + 2000);
  }

  sendFridgeRpc() {
    clearTimeout(this.fridgeTempTimer);
    this.fridgeTempTimer = setTimeout(() => {
      this.sendRPC('set', 'fridge_temp', { value: String(this.fridgeTemperatureValue) });
    }, WAIT_BEFORE_SEND_TEMPERATURE_RPC);
  }

  sendFreezerRpc() {
    clearTimeout(this.freezerTempTimer);
    this.freezerTempTimer = setTimeout(() => {
      this.sendRPC('set', 'freezer_temp', { value: String(this.freezerTemperatureValue) });
    }, WAIT_BEFORE_SEND_TEMPERATURE_RPC);
  }

  @action fidgeTemperatureIncrease() {
    if (this.fridgeTemperatureValue < this.fridgeRange.end) {
      this.fridgeTemperatureValue++;
      this.sendFridgeRpc();
      this.resetFridgeTimer();
    }
  }

  @action fidgeTemperatureDecrease() {
    if (this.fridgeTemperatureValue > this.fridgeRange.start) {
      this.fridgeTemperatureValue--;
      this.sendFridgeRpc();
      this.resetFridgeTimer();
    }
  }

  // --------------- freezer ------------------------

  @action freezerTemperatureIncrease() {
    if (this.freezerTemperatureValue < this.freezerRange.end) {
      this.freezerTemperatureValue++;
      this.sendFreezerRpc();
      this.resetFreezerTimer();
    }
  }
  @action freezerTemperatureDecrease() {
    if (this.freezerTemperatureValue > this.freezerRange.start) {
      this.freezerTemperatureValue--;
      this.sendFreezerRpc();
      this.resetFreezerTimer();
    }
  }

  getUserTriggerTopic() {
    return 'users' + '.' + this._user?.id + '.' + 'trigger_reload';
  }

  // ------------------  Devices ------------------------

  async loadPictureFromCatch(device: DeviceListNode) {
    if (device.type.name == 'emersun-w5') {
      this.setSingleCameraPicture(
        await new CameraHandler(this._singleCameraTopic!, device.id, 0).getPictureFromCache(),
      );
    } else if (device.type.name == 'emersun-w4') {
      this.imageList = [];
      this.setMultipleCameraPicture(
        await new CameraHandler(this._firstCameraTopic!, device.id, 0).getPictureFromCache(),
        0,
      );
      this.setMultipleCameraPicture(
        await new CameraHandler(this._secondCameraTopic!, device.id, 1).getPictureFromCache(),
        1,
      );
      this.setMultipleCameraPicture(
        await new CameraHandler(this._thirdCameraTopic!, device.id, 2).getPictureFromCache(),
        2,
      );
    }
  }

  @action async setSelectedDevice(index: number) {
    logger.debug('setSelectedDevice');
    this.selectedDevice = index;

    try {
      if (this.listOfDevices && this.listOfDevices.length > 0) {
        logger.debug('Changing Device To ' + this.selectedDevice);
        this.selectedDevice =
          this.selectedDevice >= this.listOfDevices.length ? 0 : this.selectedDevice;
        var device = this.listOfDevices[this.selectedDevice];
        this.changeDeviceType(device.type.name);
        this.initializeButtonMenu();
        this.errorShowList = [];
        await this.hydrateDeviceProperties(device.id);
        logger.debug('Device ID is ' + device.id);
        logger.debug('Device type name is ' + device.type.name);
        this.signatureToTopic = new SignatureToTopic(
          device.id,
          device.type.name,
          device.type.version,
        );
        this.configuringMqtt();

        this.loadPictureFromCatch(device);
        await global.services.devicesService.setCurrentDeviceIndex(this.selectedDevice);
        this.requestFullDataFromDevice();

        if (global.services.netInfoService.isConnected) {
          global.stores.setting.showDeviceInformation();
        }
      }
      this.overlayScreenMessage = '';
    } catch (error) {
      logger.error('change device id: ', error);
      this.overlayScreenMessage = '';
    }
  }

  async hydrateDeviceProperties(deviceId: number) {
    var deviceProperties = await global.services.devicePropertiesService.getDeviceProperties(
      deviceId,
    );
    this.freezerTemperatureValue = deviceProperties.freezerTemperatureValue ?? -17;
    this.fridgeTemperatureValue = deviceProperties.fridgeTemperatureValue ?? 4;
    this.lastValidFreezerTemp = this.freezerTemperatureValue;
    this.lastValidFridgeTemp = this.fridgeTemperatureValue;
    this.deviceType = deviceProperties.deviceType ?? 'emersun-sum-22ft';
    this.isDisplayOn = deviceProperties.isDisplayOn ?? true;

    this.deviceStatus.forEach(value => {
      var savedValue = deviceProperties.deviceStatus.find(
        status => status.signature == value.signature,
      );

      if (savedValue) {
        value.toggle = savedValue.toggle;
      }
    });
    this.deviceStatus = [...this.deviceStatus];
  }

  async saveDeviceProperties(deviceId: number) {
    var deviceProperties: DeviceProperties = {
      freezerTemperatureValue: this.freezerTemperatureValue,
      fridgeTemperatureValue: this.fridgeTemperatureValue,
      deviceType: this.deviceType,
      isDisplayOn: this.isDisplayOn,
      deviceStatus: this.deviceStatus,
    };
    await global.services.devicePropertiesService.setDeviceProperty(deviceId, deviceProperties);
  }

  // --------------------- Media ---------------------

  @action next() {
    this.sendRPC('next', 'multi_media');
  }

  @action previous() {
    this.sendRPC('prev', 'multi_media');
  }

  @action play() {
    this.sendRPC('play', 'multi_media');
  }

  @action volumeDown() {
    this.sendRPC('vol_down', 'multi_media');
  }

  @action volumeUp() {
    this.sendRPC('vol_up', 'multi_media');
  }

  @action changeMediaMode(mode: number) {
    switch (mode) {
      case 0: {
        this.sendRPC('mode', 'multi_media', { value: '2' });
        break;
      }
      case 1: {
        this.sendRPC('mode', 'multi_media', { value: '1' });
        break;
      }
      case 2: {
        this.sendRPC('mode', 'multi_media', { value: '0' });
        break;
      }
    }
  }

  @action scan() {
    this.sendRPC('scan', 'multi_media');
  }

  // -------------------- device status  ----------------------

  @action changeStatus(index: number) {
    if (this.signatureToTopic == undefined) return;
    var resource = this.deviceStatus[index].signature.split('.').last();
    this.sendRPC('toggle', resource);
  }

  @action addDeviceStatus(status: DeviceStatus) {
    var deviceStatus = [...this.deviceStatus];
    deviceStatus.push(status);
    this.deviceStatus = deviceStatus;
  }

  @action changeDisplayState() {
    this.sendRPC('toggle', 'power');
  }
}

export interface InjectedMenuStore {
  menu: MenuStore;
}
