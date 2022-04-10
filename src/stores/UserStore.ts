import { action, observable } from 'mobx';
import Logger from '../utils/Logger';
import { Store } from './core/Store';

var logger = new Logger('ProfileStore');

export class ProfileStore extends Store {
  constructor() {
    super();
  }

  @observable name: string = '';
  @observable family: string = '';
  @observable id_code: string = '';
  @observable phone: string = '';
  @observable avatar_url: string | null = null;
  @observable avatar_placeholder: string = '';

  @action setProfileInfo = () => {
    try {
      global.services.userService.getUser().then((user) => {
        this.name = user.first_name;
        this.family = user.last_name;
        this.id_code = user.national_code;
        this.phone = user.phone;
        this.avatar_placeholder = `${this.name.charAt(0)} ${this.family.charAt(0)}`;
      });
    } catch (error) {
      logger.error('setProfileInfo', error);
    }
  };
}

export interface InjectedProfileStore {
  profile: ProfileStore;
}
