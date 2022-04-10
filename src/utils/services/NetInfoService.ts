import { NetInfoState } from '@react-native-community/netinfo';
import { Subject, Subscription } from 'rxjs';

interface netinfoSubscription {
  id: Object;
  subscription: Subscription;
}

class NetInfoService {
  private _isConnect: boolean;
  private _isInternetReachable: boolean;
  private _event: Subject<NetInfoState>;
  private _subscriptions: Array<netinfoSubscription>;

  constructor() {
    this._isConnect = false;
    this._isInternetReachable = false;
    this._event = new Subject<NetInfoState>();
    this._subscriptions = [];
  }

  public get isConnected(): boolean {
    return this._isConnect;
  }

  public get hasInternet(): boolean {
    return this._isConnect && this._isInternetReachable;
  }

  public listen(id: Object, callBack: (connectionSate: NetInfoState) => any) {
    const sub = this._event.subscribe({
      next: (connectionSate) => {
        callBack(connectionSate);
      },
    });

    this._subscriptions.push({
      id: id,
      subscription: sub,
    });
  }

  public clear(id: Object) {
    this._subscriptions
      .filter((x) => x.id == id)
      .forEach(({ subscription }, index) => {
        subscription.unsubscribe();
        this._subscriptions.splice(index, 1);
      });
  }

  public updateState(connectionSate: NetInfoState) {
    this._isConnect = connectionSate.isConnected;
    this._isInternetReachable = connectionSate.isInternetReachable ? true : false;
    this._event.next(connectionSate);
  }
}

export default NetInfoService;
