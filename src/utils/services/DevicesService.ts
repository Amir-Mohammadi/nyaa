import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { DeviceListNode } from '../../api';
import Logger from '../Logger';
import { AsyncStoreKeys } from '../models';

var logger = new Logger('DevicesService');

export default class DevicesService {
  private _devices?: Array<DeviceListNode>;
  private _currentDeviceIndex?: number;
  private _onDevicesUpdate: (devices: Array<DeviceListNode>) => any = () => {};

  public getCurrentDeviceOrDefault = async () => {
    return await this._getCurrentDeviceOrDefault();
  };

  public getCurrentDeviceIndexOrDefault = async () => {
    if (this._currentDeviceIndex) return this._currentDeviceIndex;

    return await this.loadCurrentDeviceIndexFromAsyncStorage();
  };

  public listenToDevicesUpdate = (callBack: (devices: Array<DeviceListNode>) => any) => {
    this._onDevicesUpdate = callBack;
  };

  public getDevices = async () => {
    if (this._devices) {
      return this._devices;
    }

    var devices = await this.loadDevicesFromAsyncStore();

    if (!devices) {
      devices = (await this.loadDevicesOnline()) ?? [];
    }

    this._devices = devices;

    return devices;
  };

  public setCurrentDeviceIndex = async (currentDeviceIndex: number) => {
    await AsyncStorage.setItem(AsyncStoreKeys.SELECTED_DEVICE_INDEX, currentDeviceIndex.toString());
    logger.debug(`save current device index ${currentDeviceIndex} in async store`);
    this._currentDeviceIndex = currentDeviceIndex;
  };

  public setDevices = async (devices?: Array<DeviceListNode>) => {
    if (!devices) {
      await AsyncStorage.removeItem(AsyncStoreKeys.LIST_OF_DEVICES);
      logger.debug('remove devices from async store');
      this._devices = undefined;
      return;
    }

    await AsyncStorage.setItem(AsyncStoreKeys.LIST_OF_DEVICES, JSON.stringify(devices));
    logger.debug(`save devices list with length ${devices?.length} in async store`);
    this._devices = devices;
  };

  public loadDevicesFromAsyncStore = async () => {
    try {
      var rawDevicesString = await AsyncStorage.getItem(AsyncStoreKeys.LIST_OF_DEVICES);

      if (!rawDevicesString) return undefined;

      var devices: Array<DeviceListNode> = JSON.parse(rawDevicesString);

      this._devices = devices;
      logger.debug(`load devices from async store with length ${devices.length}`);
      return devices;
    } catch (error) {
      logger.error('encounter error while reading the devices from async store', error);
      this.setDevices(undefined);
      return undefined;
    }
  };

  private async _getCurrentDeviceOrDefault() {
    if (!this._devices) await this.getDevices();
    var devices = this._devices!;

    if (!this._currentDeviceIndex) await this.loadCurrentDeviceIndexFromAsyncStorage();
    var currentDeviceIndex = this._currentDeviceIndex!;

    var currentDevice = devices[currentDeviceIndex];
    if (!currentDevice) {
      logger.info('current device index was not in the devices list, reset to zero');
      this.setCurrentDeviceIndex(0);
      currentDevice = devices[0];
    }
    return currentDevice;
  }

  public loadDevicesOnline = async () => {
    try {
      var devices = await api.v1.device.devices(true);
      this._devices = devices;
      await this.setDevices(devices);
      this._onDevicesUpdate(devices);
      logger.debug(`devices with length ${devices.length} fetched online successfully`);
      return devices;
    } catch (error) {
      logger.error('encounter error while loading devices online', error);
    }
  };

  public loadCurrentDeviceIndexFromAsyncStorage = async () => {
    try {
      var rawCurrentDeviceIndexString = await AsyncStorage.getItem(
        AsyncStoreKeys.SELECTED_DEVICE_INDEX,
      );

      if (!rawCurrentDeviceIndexString) {
        throw new Error(`${rawCurrentDeviceIndexString} is not a number`);
      }

      var currentDeviceIndex = parseInt(rawCurrentDeviceIndexString);

      if (Number.isNaN(currentDeviceIndex)) {
        throw new Error(`${currentDeviceIndex} is not a number`);
      }

      logger.debug(`device index ${currentDeviceIndex} loaded from AsyncStore successfully`);
      this._currentDeviceIndex = currentDeviceIndex;
      return currentDeviceIndex;
    } catch (error) {
      logger.error('encounter error while reading current device index from async store', error);
      await this.setCurrentDeviceIndex(0);
      return 0;
    }
  };
}
