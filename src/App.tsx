import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'mobx-react';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigator from './Routes';
import ErrorBoundary from './utils/boundaries/ErrorBoundary';
import { loadAppStateEvent as loadAppStateEventListener } from './utils/loaders/AppStateListenerLoader';
import { loadExtensions } from './utils/loaders/ExtensionsLoader';
import { loadFileLogger } from './utils/loaders/FileLoggerLoader';
import {
  loadNetInfoEventListener,
  netInfoEventListenerUnsubscribe,
} from './utils/loaders/NetworkInfoLoader';
import { loadServices } from './utils/loaders/ServicesLoader';
import { loadStores } from './utils/loaders/StoresLoader';
import Logger from './utils/Logger';
import { AsyncStoreKeys } from './utils/models';

const logger = new Logger('APP');
const SPLASH_SCREEN_TIMEOUT = 2000;

loadServices();
loadExtensions();
loadFileLogger();
loadStores();
loadNetInfoEventListener();
loadAppStateEventListener();

class App extends React.Component {
  loadData = async () => {
    await global.services.userService.loadUserFromAsyncStore();
    await global.services.userService.loadTokenFromAsyncStore();

    var isIntroWatched = await AsyncStorage.getItem(AsyncStoreKeys.IS_INTRO_WATCHED);
    if (isIntroWatched === 'true') global.stores.auth.isIntroWatched = true;
    else global.stores.auth.isIntroWatched = false;
  };

  checkToken = async () => {
    var token = await global.services.userService.getToken();
    if (token) {
      global.stores.auth.setIsLoggedIn(true);
      global.services.devicesService.loadDevicesOnline();
      global.services.userService.loadUserOnline();
      global.stores.menu.initialize();
      logger.debug('token exist, going to home page');
    } else {
      logger.debug('token not exist, going to login page');
    }
  };

  componentWillUnmount() {
    netInfoEventListenerUnsubscribe();
  }

  async componentDidMount() {
    await this.loadData();
    await this.checkToken();

    setTimeout(() => {
      SplashScreen.hide();
    }, SPLASH_SCREEN_TIMEOUT);
  }

  render() {
    return (
      <Provider {...global.stores}>
        <Navigator />
      </Provider>
    );
  }
}

export default ErrorBoundary(App);
