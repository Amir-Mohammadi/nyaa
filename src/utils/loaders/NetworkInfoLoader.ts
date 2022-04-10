import NetInfo from '@react-native-community/netinfo';
import { addStateChangeCallBack } from '../InternetEventLister';
import Logger from '../Logger';

const logger = new Logger('LOADER');

export let netInfoEventListenerUnsubscribe: Function = () => {};

export const loadNetInfoEventListener = () => {
  netInfoEventListenerUnsubscribe = NetInfo.addEventListener((state) => {
    global.stores.connection.initial(state);
    global.services.netInfoService.updateState(state);
    addStateChangeCallBack(state);
  });
};

logger.debug('net info initialize was successful');
