import Logger from '../Logger';
import DevicePropertiesService from '../services/DevicePropertiesService';
import DevicesService from '../services/DevicesService';
import ErrorHandlerService from '../services/ErrorHandlerService';
import NetInfoService from '../services/NetInfoService';
import SharedDevicesService from '../services/SharedDeviceService';
import UserService from '../services/UserService';

const logger = new Logger('LOADER');

export interface Services {
  userService: UserService;
  errorHandler: ErrorHandlerService;
  devicesService: DevicesService;
  sharedDevices: SharedDevicesService;
  devicePropertiesService: DevicePropertiesService;
  netInfoService: NetInfoService;
}

export const loadServices = () => {
  const services: Services = {
    userService: new UserService(),
    errorHandler: new ErrorHandlerService(),
    devicesService: new DevicesService(),
    sharedDevices: new SharedDevicesService(),
    devicePropertiesService: new DevicePropertiesService(),
    netInfoService: new NetInfoService(),
  };

  if (global && typeof global.services != 'object') {
    global.services = services;

    logger.debug('initialize services was successful');
  }
};
