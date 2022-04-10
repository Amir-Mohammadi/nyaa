import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceTypes } from '../../constants/DeviceTypes';
import Logger from '../Logger';
import { DeviceStatus } from '../models';

var logger = new Logger('DevicePropertiesService');

export default class DevicePropertiesService {
  public async getDeviceProperties(deviceId: number) {
    var deviceProperties = await this._loadDevicePropertiesFromAsyncStore(deviceId);
    logger.info('device properties loaded from async store successfully');
    if (!deviceProperties) return defaultDeviceProperties;
    return deviceProperties;
  }

  public async setDeviceProperty(deviceId: number, deviceProperties: DeviceProperties) {
    var key = this._generateDevicePropertyKey(deviceId);
    await AsyncStorage.setItem(
      key,
      JSON.stringify(deviceProperties, (_, value) => {
        return value;
      }),
    );
  }

  private _loadDevicePropertiesFromAsyncStore = async (deviceId: number) => {
    try {
      var key = this._generateDevicePropertyKey(deviceId);
      var rawDevicePropertyString = await AsyncStorage.getItem(key);

      if (!rawDevicePropertyString) return undefined;

      var deviceProperties: DeviceProperties = JSON.parse(rawDevicePropertyString, (_, value) => {
        return value;
      });

      return deviceProperties;
    } catch (error) {
      logger.error('Encounter error while reading device properties', error);
      return undefined;
    }
  };

  private _generateDevicePropertyKey(deviceId: number) {
    return `${deviceId}-properties`;
  }
}

const defaultDeviceProperties: DeviceProperties = {
  deviceStatus: [
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
    {
      signature: 'core.parlar.ToggleableBool.lock',
      icon: 'lock',
      text: 'Lock',
      toggle: false,
    },
    {
      signature: 'core.parlar.ToggleableBool.mute',
      icon: 'mute',
      text: 'Mute',
      toggle: false,
    },
    {
      signature: 'core.parlar.ToggleableBool.super',
      icon: 'super',
      text: 'Super',
      toggle: false,
    },
    {
      signature: 'core.parlar.ToggleableBool.eco',
      icon: 'eco',
      text: 'Eco',
      toggle: false,
    },
  ],
  deviceType: 'emersun-sum-22ft',
  isDisplayOn: true,
  freezerTemperatureValue: -17,
  fridgeTemperatureValue: 4,
};

export interface DeviceProperties {
  deviceType: DeviceTypes;
  fridgeTemperatureValue: number;
  freezerTemperatureValue: number;
  deviceStatus: DeviceStatus[];
  isDisplayOn: boolean;
}
