import { NetInfoState } from '@react-native-community/netinfo';
import { action, observable } from 'mobx';
import { Store } from './core/Store';

export class ConnectionStore extends Store {
  @observable isConnect: boolean = false;
  @observable isInternetReachable: boolean = false;
  @observable connectionType: string = 'none';

  @action public initial(connectionSate: NetInfoState) {
    this.isConnect = !!connectionSate.isConnected;
    this.connectionType = connectionSate.type;
    this.isInternetReachable = connectionSate.isInternetReachable ? true : false;

    if (this.isConnect && this.isInternetReachable && global.stores.auth.isLoggedIn) {
      global.services.devicesService.loadDevicesOnline();
      global.stores.menu.onInternetBackOnline();
    }
  }
}

export interface InjectedConnectionStore {
  connection: ConnectionStore;
}
