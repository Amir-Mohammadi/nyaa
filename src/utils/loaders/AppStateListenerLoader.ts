import { AppState } from 'react-native';
import Logger from '../Logger';
import { setSuppressedApiToast } from '../services/ErrorHandlerService';

const logger = new Logger('LOADER');

export const loadAppStateEvent = () => {
  addEventToReloadAppOnChangeState();
};

const addEventToReloadAppOnChangeState = () => {
  AppState.addEventListener('change', state => {
    if (state === 'active') {
      global.stores.menu.reloadMenuStore();
      setSuppressedApiToast(false);
    } else {
      setSuppressedApiToast(true);
    }
  });

  logger.debug('initialize app state listener was successful');
};
