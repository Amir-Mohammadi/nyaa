import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { SharedDevice } from '../../api';
import Logger from '../Logger';

var logger = new Logger('SharedDevice');
const sharedDevicesReg = /^@(\d)+-shared-devices$/g;

class SharedDevicesService {
  private _onSharedDeviceListUpdate: (deviceId: number, sharedDevices: Array<SharedDevice>) => any =
    () => {};

  public getSharedDeviceList = async (deviceId: number) => {
    var shardDevices = await this._loadSharedDeviceListFromAsyncStorage(deviceId);

    if (!shardDevices) {
      shardDevices = await this.loadSharedDeviceListOnline(deviceId);
    } else this.loadSharedDeviceListOnline(deviceId);

    return shardDevices;
  };

  public loadSharedDeviceListOnline = async (deviceId: number): Promise<Array<SharedDevice>> => {
    let response = await api.v1.sharedDevice.sharedDevices(deviceId);

    await this.setSharedDevicesList(deviceId, response.data);
    this._onSharedDeviceListUpdate(deviceId, response.data);

    return response.data;
  };

  public listenToSharedDevices(
    callBack: (deviceId: number, sharedDevices: Array<SharedDevice>) => any,
  ) {
    this._onSharedDeviceListUpdate = callBack;
  }

  private _loadSharedDeviceListFromAsyncStorage = async (
    deviceId: number,
  ): Promise<Array<SharedDevice> | undefined> => {
    try {
      var sharedDeviceKey = this._generateSharedDeviceKey(deviceId);
      let rawSharedDeviceString = await AsyncStorage.getItem(sharedDeviceKey);

      if (!rawSharedDeviceString) return undefined;

      var sharedDevices: Array<SharedDevice> = JSON.parse(rawSharedDeviceString);

      return sharedDevices;
    } catch (error) {
      logger.error('encounter error while reading the device list from async storage');
      return undefined;
    }
  };

  public setSharedDevicesList = async (deviceId: number, sharedDevices?: Array<SharedDevice>) => {
    var sharedDeviceKey = this._generateSharedDeviceKey(deviceId);
    if (!sharedDevices) {
      await AsyncStorage.removeItem(sharedDeviceKey);
      return;
    }

    await AsyncStorage.setItem(sharedDeviceKey, JSON.stringify(sharedDevices));
  };

  private _generateSharedDeviceKey = (deviceId: number) => {
    return `@${deviceId}-shared-devices`;
  };
}

export default SharedDevicesService;
