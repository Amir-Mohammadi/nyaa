import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, observable } from 'mobx';
import RNRestart from 'react-native-restart';
import api from '../api';
import { DeviceListNode, SharedDevice } from '../api/models';
import { SharedDeviceItem } from '../components/SettingList';
import Logger from '../utils/Logger';
import { Preprocessor } from '../utils/preprocessor';
import { navigate } from '../utils/RootNavigation';
import { showToastAndroid } from '../utils/ToastAndroidHandler';
import Validator from '../utils/validator';
import { Store } from './core/Store';
import { DialogStatus } from './NotificationStore';

const logger = new Logger('Setting Store');

export class SettingStore extends Store {
  @observable deviceName: string = '';
  @observable versionCode: string = '';
  @observable deviceId: number = 0;
  @observable deviceType: string = '';
  @observable alertMessage: string = '';
  @observable alertVisitable: boolean = false;
  @action alertConfirm: Function = () => {};
  @action alertCancel: Function = () => {};
  @observable disabled: boolean = false;
  @observable shareList: SharedDeviceItem[] = [];
  @observable shareDeviceAvailable: boolean = false;
  device?: DeviceListNode;

  private _user: import('d:/Projects/React-Native/nyaa/src/api/models').User;

  @action async loadSharedDeviceList() {
    this.device = await global.services.devicesService.getCurrentDeviceOrDefault();
    await this.checkShareDeviceAvailability();

    try {
      if (this.shareDeviceAvailable) {
        global.services.sharedDevices.listenToSharedDevices((deviceId, list) => {
          if (deviceId == this.device?.id) {
            this._loadSharedDeviceList(list);
          }
        });

        let sharedDeviceList = await global.services.sharedDevices.getSharedDeviceList(
          this.device.id,
        );
        this._loadSharedDeviceList(sharedDeviceList);
      }
    } catch (error) {
      logger.error('loadSharedDeviceList:', error);
      this.disabled = false;
    }
  }

  @action private _loadSharedDeviceList(sharedDeviceList: SharedDevice[]) {
    let temp: SharedDeviceItem[] = [];
    sharedDeviceList.forEach(element => {
      temp.push({
        action: () => {
          this.deleteSharedDeviceConfirm(element.id, element.user.id);
        },
        number: element.user.phone,
        title: element.user.first_name + ' ' + element.user.last_name,
        type: 'ShareItem',
      });
    });
    this.shareList = temp;
  }

  @action checkShareDeviceAvailability = async () => {
    this._user = await global.services.userService.getUser();
    this.shareDeviceAvailable = this.device?.owner?.id
      ? this._user.id == this.device.owner.id
      : false;
  };

  notifyUserShareDevice(id: number) {
    let userTopic = 'users.' + id + '.trigger_reload';
    global.stores.menu.notifyUserAfterChangeShared(userTopic);
  }

  @action deleteSharedDeviceConfirm(sharedId: number, userId: number) {
    if (this.device === undefined) return;

    this.alertVisitable = true;
    this.alertMessage = 'آیا قصد حذف اشتراک را دارید؟';
    this.alertConfirm = async () => {
      try {
        this.disabled = true;
        await api.v1.sharedDevice.delete(sharedId);
        showToastAndroid('با موفقیت حذف شد');
        await global.services.sharedDevices.setSharedDevicesList(this.device?.id!, undefined);
        await this.loadSharedDeviceList();
        this.notifyUserShareDevice(userId);
        this.disabled = false;
        this.alertVisitable = false;
      } catch (error) {
        logger.error('deleteSharedDeviceConfirm', error);
        this.disabled = false;
        this.alertVisitable = false;
      }
    };
    this.alertCancel = () => {
      this.disabled = false;
      this.alertVisitable = false;
    };
  }

  @action logoutConfirm() {
    this.alertVisitable = true;
    this.alertMessage = 'آیا قصد خروج از اکانت خود را دارید؟';
    this.alertConfirm = () => {
      this.alertVisitable = false;
      AsyncStorage.clear();
      RNRestart.Restart();
    };
    this.alertCancel = () => {
      this.alertVisitable = false;
    };
  }

  @action initialize() {
    this.showDeviceInformation();
  }

  @action async showDeviceInformation() {
    logger.debug('showDeviceInformation started');
    try {
      var currentDevice = await global.services.devicesService.getCurrentDeviceOrDefault();
      this.device = currentDevice;
      this.deviceName = currentDevice.name;
      this.versionCode = currentDevice.type.version;
      this.deviceType = currentDevice.type.name;
      await this.loadSharedDeviceList();
      logger.debug('device info loaded successfully, device id is', this.deviceId);
    } catch (error) {
      logger.error('showDeviceInformation', error);
    }
  }

  @action changeDeviceName() {
    global.stores.dialog
      .askQuesting({
        inputPreprocessor: deviceName => Preprocessor.preprocessInput(deviceName),
        bodyMessage: 'آیا قصد تغییر نام دستگاه را دارید؟',
        onConfirm: async newName => this._doChangeDeviceName(newName),
        inputValuator: deviceName => Validator.validateDeviceName(deviceName),
        defaultValue: this.deviceName,
      })
      .then(result => {
        if (result.status == DialogStatus.CONFIRM) {
          showToastAndroid('نام دستگاه با موفقیت تغییر کرد');
          global.stores.menu.initialize();
        }
      });
  }

  private async _doChangeDeviceName(newName: string) {
    if (!this.device) return;

    await api.v1.device.update({
      id: this.device.id,
      enabled: 0,
      name: newName,
    });

    this.deviceName = newName;
    await global.services.devicesService.setDevices(undefined);
    logger.debug('device updated successfully, id:', this.deviceId);
  }

  @action deleteDevice() {
    global.stores.dialog
      .askConfirm('آیا قصد حذف این دستگاه را دارید؟', async () => {
        await this._deleteDevice();
        await global.services.devicesService.setDevices(undefined);
        await global.stores.menu.initialize();
      })
      .then(result => {
        if (result.status === DialogStatus.CONFIRM) {
          showToastAndroid('دستگاه با موفقیت حذف شد');
          navigate('Menu');
        }
      });
  }

  private async _deleteDevice() {
    if (!this.device) return;

    await api.v1.device.delete(this.device.id);

    if (this.device.owner?.id) {
      this.notifyUserShareDevice(this.device.owner?.id);
    }
  }

  @action shareDevice() {
    global.stores.dialog
      .askQuesting({
        bodyMessage: 'شماره تلفن همراه فرد مورد نظر را وارد کنید',
        onConfirm: async phoneNumber => this._doShareDevice(phoneNumber),
        inputValuator: phoneNumber => Validator.validatePhoneNumber(phoneNumber),
        inputPreprocessor: phoneNumber => Preprocessor.preprocessPhoneNumber(phoneNumber),
        keyboardType: 'phone-pad',
      })
      .then(res => {
        if (DialogStatus.CONFIRM == res.status) {
          showToastAndroid('اشتراک گذاری با موفقیت انجام شد.');
        }
      });
  }

  private async _doShareDevice(phoneNumber: string) {
    if (!this.device) throw new Error('_doShareDevice: device not found');

    let res = await api.v1.sharedDevice.request({
      device_id: this.device.id + '',
      phone: phoneNumber,
    });
    let sharedDevices = res;
    this.notifyUserShareDevice(sharedDevices.user.id);
    await global.services.sharedDevices.setSharedDevicesList(this.device.id, undefined);
    await this.loadSharedDeviceList();
  }
}

export interface InjectedSettingStore {
  setting: SettingStore;
}
