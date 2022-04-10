import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { User } from '../../api';
import Logger from '../Logger';
import { AsyncStoreKeys } from '../models';

var logger = new Logger('UserService');

export default class UserService {
  private _user?: User;
  private _token?: string;

  public async getUser(): Promise<User> {
    if (this._user) return this._user;

    var user = await this.loadUserFromAsyncStore();

    if (!user) {
      user = await this.loadUserOnline();
    } else this.loadUserOnline();

    return user;
  }

  public async getToken() {
    if (this._token) return this._token;

    var token = await this.loadTokenFromAsyncStore();

    this._token = token;
    return token;
  }

  public loadUserFromAsyncStore = async () => {
    try {
      var rawUserString = await AsyncStorage.getItem(AsyncStoreKeys.USER);

      if (!rawUserString) return undefined;

      var user = JSON.parse(rawUserString);

      logger.debug(`user with id ${user?.id} load from AsyncStore successfully`);
      this._user = user;
      return user;
    } catch (error) {
      logger.error('error on reading the USER asyncStorage', error);
      logger.info('resetting the USER storage');
      this.setUser(undefined);
      return undefined;
    }
  };

  public loadUserOnline = async () => {
    var user = await api.v1.accounts.getCurrentUser(true);
    logger.debug(
      `user "${user.first_name + user.last_name}" with id ${user.id} get online successfully`,
    );
    await this.setUser(user);
    return user;
  };

  public setUser = async (user?: User) => {
    if (!user) {
      return await AsyncStorage.removeItem(AsyncStoreKeys.USER);
    }
    this._user = user;
    await AsyncStorage.setItem(AsyncStoreKeys.USER, JSON.stringify(user));
    logger.debug(`user "${user?.first_name}" with id ${user?.id} save in AsyncStore successfully`);
  };

  public loadTokenFromAsyncStore = async () => {
    try {
      var token = await AsyncStorage.getItem(AsyncStoreKeys.TOKEN);

      if (!token) return undefined;

      logger.debug(`token loaded from AsyncStore successfully`);
      this._token = token;
      return token;
    } catch (error) {
      logger.error('error on reading the USER asyncStorage', error);
      logger.info('resetting the USER storage');
      this.setToken(undefined);
      return undefined;
    }
  };

  public setToken = async (token?: string) => {
    if (!token) {
      logger.debug(`token removed from AsyncStore`);
      return await AsyncStorage.removeItem(AsyncStoreKeys.TOKEN);
    }
    this._token = token;
    await AsyncStorage.setItem(AsyncStoreKeys.TOKEN, token);
    logger.debug(`token save in AsyncStore successfully`);
  };
}
