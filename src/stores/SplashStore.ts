import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, observable } from 'mobx';
import SplashScreen from 'react-native-splash-screen';
import Logger from '../utils/Logger';
import { AsyncStoreKeys } from '../utils/models';
import { Store } from './core/Store';

var logger = new Logger('SplashStore');
export class SplashStore extends Store {
  @observable hasSession: boolean = false;

  @action async checkSession() {
    var token = await AsyncStorage.getItem(AsyncStoreKeys.TOKEN);
    if (token !== null) {
      logger.debug('start app, loading data');
      this.hasSession = true;
      global.stores.menu.initialize();
    } else {
      this.hasSession = false;
    }
    logger.debug('check session done');
    SplashScreen.hide();
  }
}

export interface InjectedSplashStore {
  splash: SplashStore;
}
