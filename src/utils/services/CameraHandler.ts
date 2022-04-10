import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraUtil from '../CameraUtil';
import { Prophet } from '../mqtt/Prophet';
import { Placeholder } from '../StaticValues';

class CameraHandler {
  private lastCounter: number = 0;
  private currentCounter: number = 0;
  private pictureTopic: string = '';
  private deviceId: number = 0;
  private cameraId: number = 0;
  private mqtt: Prophet = Prophet.getInstance();
  private picture: any;

  constructor(pictureTopic: string, deviceId: number, cameraId: number) {
    this.pictureTopic = pictureTopic;
    this.deviceId = deviceId;
    this.cameraId = cameraId;
  }

  public async getPicture(counter: number): Promise<string> {
    this.currentCounter = counter;
    this.lastCounter = await this.getLastCounter();
    if (this.currentCounter === this.lastCounter) {
      return await this._getPictureFromCache();
    } else {
      return await this._getPictureFromMqtt();
    }
  }

  private getCounterKey() {
    return this.deviceId + '_' + this.cameraId + '-counter';
  }

  private getPictureKey() {
    return this.deviceId + '_' + this.cameraId + '-data';
  }

  private async getLastCounter(): Promise<number> {
    try {
      return Number(await AsyncStorage.getItem(this.getCounterKey()));
    } catch (error) {
      console.error('get last counter', error);
      return 0;
    }
  }

  private async _getPictureFromMqtt() {
    return new Promise<string>((resolve, reject) => {
      this.mqtt.listenTo(this.pictureTopic, (message) => {
        try {
          this.picture = CameraUtil.TransferToFile(message.data);
          resolve(this.picture);
          AsyncStorage.setItem(this.getPictureKey(), this.picture);
          AsyncStorage.setItem(this.getCounterKey(), this.currentCounter + '');
          this.mqtt.clean(this.pictureTopic);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private async _getPictureFromCache() {
    let data = await AsyncStorage.getItem(this.getPictureKey());
    if (data === null) {
      return await this._getPictureFromMqtt();
    } else {
      return data;
    }
  }

  public async getPictureFromCache() {
    let data = await AsyncStorage.getItem(this.getPictureKey());
    return data || Placeholder;
  }
}

export default CameraHandler;
