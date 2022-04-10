import { NetInfoState } from '@react-native-community/netinfo';
import Logger from './Logger';

const logger = new Logger('InternetEventListener');

export const addStateChangeCallBack = (connectionSate: NetInfoState) => {
  if (connectionSate.isConnected && connectionSate.isInternetReachable) {
    onInternetBackOnline();
  }
};

const onInternetBackOnline = () => {
  logger.debug('onInternetBackOnline');
  if (global.stores.auth.isLoggedIn) {
    global.services.userService.loadUserFromAsyncStore();
    global.stores.menu.onInternetBackOnline();
  }
};
