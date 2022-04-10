import {
  AddDeviceStore,
  AuthStore,
  ConnectionStore,
  InjectedAddDeviceStore,
  InjectedAuthStore,
  InjectedConnectionStore,
  InjectedMenuStore,
  InjectedProfileStore,
  InjectedSettingStore,
  InjectedSplashStore,
  MenuStore,
  ProfileStore,
  SettingStore,
  SplashStore,
  Store,
} from '../../stores';
import { DialogStore, InjectedDialogStore } from '../../stores/NotificationStore';
import Logger from '../Logger';

const logger = new Logger('LOADER');

export type ApplicationInjectedStore = InjectedSettingStore &
  InjectedMenuStore &
  InjectedAuthStore &
  InjectedAddDeviceStore &
  InjectedConnectionStore &
  InjectedSplashStore &
  InjectedProfileStore &
  InjectedDialogStore;

export const loadStores = (force = false) => {
  const stores = Store.createRegistry<ApplicationInjectedStore>({
    setting: new SettingStore(),
    menu: new MenuStore(),
    auth: new AuthStore(),
    addDevice: new AddDeviceStore(),
    connection: new ConnectionStore(),
    splash: new SplashStore(),
    profile: new ProfileStore(),
    dialog: new DialogStore(),
  });

  if (force || (global && typeof global.stores != 'object')) {
    global.stores = stores;

    logger.debug('initialize stores was successful');
  }
};
