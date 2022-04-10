import { action, observable } from 'mobx';
import { PermissionsAndroid } from 'react-native';
import api, { Device, PublicDeviceInfo } from '../api';
import { ProgressPageItems as ProgressPageItem } from '../components/add-device/Progress';
import { AddDeviceSteps } from '../screens/add-device/AddDevice';
import EsptouchSmartConfig, { EsptouchSmartConfigResult } from '../utils/EsptouchSmartConfig';
import { WiFi } from '../utils/GetCurrentSSID';
import Logger from '../utils/Logger';
import { CheckPermission, GetPermission } from '../utils/Permission';
import { Preprocessor } from '../utils/preprocessor';
import { navigate } from '../utils/RootNavigation';
import Validator from '../utils/validator';
import { Store } from './core/Store';

const logger = new Logger('AddDevice');

export class AddDeviceStore extends Store {
  @observable public inProcess: boolean = false;
  @observable public failPageMessage: string = '';
  @observable public configDeviceProgressPageItems: Array<ProgressPageItem> = [];
  @observable public countdownValue: number = 0;
  @observable public finalizingTransferPageIsLoading: boolean = false;
  @observable public locationPermissionStatus: boolean = false;
  @observable public addDeviceCurrentPage: AddDeviceSteps = AddDeviceSteps.SelectingUserWifi;
  @observable public isSelectUserWifiButtonLoading: boolean = false;
  @observable public deviceName: string = 'unknown';
  private selectedWiFi: WiFi | null = null;
  private selectedWiFiPassword: string = '';
  private _countdownIntervalReference: NodeJS.Timeout;
  private _esptouchSmartConfigTimeoutReference: NodeJS.Timeout;
  private _isEsptouchSmartConfigCancelled: boolean = false;

  constructor() {
    super();
    CheckPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(result => {
        this.locationPermissionStatus = result;
      })
      .catch(() => {
        this.locationPermissionStatus = false;
      });
  }

  @action
  private _clearCountdown() {
    this.countdownValue = 0;
    clearInterval(this._countdownIntervalReference);
  }

  @action
  setDeviceName(name: string) {
    this.deviceName = name;
  }

  @action
  private _startCountdown(initialTime: number) {
    this.countdownValue = initialTime;
    clearInterval(this._countdownIntervalReference);

    this._countdownIntervalReference = setInterval(() => {
      this.countdownValue -= 1;

      if (this.countdownValue <= 0) {
        clearInterval(this._countdownIntervalReference);
      }
    }, 1000);
  }

  @action
  private _finishConfigDeviceProgress(index: number): void {
    const temp = [...this.configDeviceProgressPageItems];
    temp[index].status = 'done';
    this.configDeviceProgressPageItems = temp;
  }

  @action
  private _failConfigDeviceProgressIfLoading(index: number): void {
    const temp = [...this.configDeviceProgressPageItems];
    if (temp[index].status == 'loading') {
      temp[index].status = 'failed';
    }
    this.configDeviceProgressPageItems = temp;
  }

  private async _retrieveDeviceInfoByMacAddress(bssid: string): Promise<PublicDeviceInfo> {
    try {
      this._startCountdown(10);
      const BSSID = AddDeviceStore._convertApSSIDtoStationBSSID(bssid);
      return await api.v1.device.getDeviceInfoByMac(BSSID, 10000, true);
    } catch (error) {
      // if (this._isEsptouchSmartConfigCancelled) {
      //   this.failPageMessage = 'مشکلی در هنگام دریافت اطلاعات دستگاه به وجود آمده است';
      //   this._navigateToPage(AddDeviceSteps.FailedPage);
      // }
      throw new Error('Failed to retrieve device info');
    } finally {
      this._clearCountdown();
    }
  }

  private async _transferOwnerOfDevice(device: PublicDeviceInfo): Promise<Device> {
    try {
      this._startCountdown(10);
      return await api.v1.ownerCheck.verifyTransfer(
        {
          device_id: device.id,
          verify_token: '',
        },
        10000,
      );
    } catch (error) {
      // if (this._isEsptouchSmartConfigCancelled) {
      //   this.failPageMessage = 'مشکلی در هنگام ثبت مالک دستگاه به وجود آمده است';
      //   this._navigateToPage(AddDeviceSteps.FailedPage);
      // }
      throw new Error('Failed to transfer device owner');
    } finally {
      this._clearCountdown();
    }
  }

  private _sendDeviceConfiguration(
    wifi: WiFi,
    password: string,
  ): Promise<EsptouchSmartConfigResult> {
    return new Promise<EsptouchSmartConfigResult>(async (resolve, reject) => {
      this._isEsptouchSmartConfigCancelled = false;
      this.failPageMessage = 'مشکلی در هنگام ارسال اطلاعات WiFi به دستگاه پیش آمده است';
      clearTimeout(this._esptouchSmartConfigTimeoutReference);

      this._startCountdown(30);
      logger.info('start smart config');
      this._esptouchSmartConfigTimeoutReference = setTimeout(async () => {
        EsptouchSmartConfig.stop();
        this._clearCountdown();
        // this._navigateToPage(AddDeviceSteps.FailedPage);
        reject('send device configuration failed');
      }, 30000);

      try {
        const res = await this._send(wifi, password);
        clearTimeout(this._esptouchSmartConfigTimeoutReference);
        resolve(res);
      } catch (error) {
        // do shit
      } finally {
        logger.trace('clear timeout');
      }
    });
  }

  private _send(wifi: WiFi, password: string): Promise<EsptouchSmartConfigResult> {
    return new Promise<EsptouchSmartConfigResult>(async (resolve, reject) => {
      try {
        const result = await EsptouchSmartConfig.start({
          SSID: wifi.ssid,
          BSSID: wifi.bssid,
          password: password,
        });

        if (result.length == 0) {
          reject('send device configuration failed');
        }

        logger.info('configured device ', result[0]);
        resolve(result[0]);
      } catch (error) {
        reject('send device configuration failed');
      }
    });
  }

  private static _convertApSSIDtoStationBSSID(bssid: string): string {
    const apMacFirstTwoLetterString = bssid.slice(0, 2);
    const apMacFirstTwoLetter = parseInt(apMacFirstTwoLetterString, 16);

    let apMacTemp = apMacFirstTwoLetter & 0x7;

    if (apMacTemp == 0) {
      apMacTemp = 0x2;
    } else if (apMacTemp == 2) {
      apMacTemp = 0x6;
    } else if (apMacTemp == 4) {
      apMacTemp = 0x6;
    } else {
      apMacTemp = 0x2;
    }

    const stationMacFirstTwoLetter = ((apMacFirstTwoLetter & 0xf8) | apMacTemp).toString(16);

    const result = stationMacFirstTwoLetter + bssid.slice(2);

    return AddDeviceStore._formatMacAddress(result);
  }

  private static _formatMacAddress(macAddress: string): string {
    let divisionChar = ':';
    return macAddress
      .replace(/(.{2})/g, '$1' + divisionChar)
      .substring(0, 17)
      .toUpperCase();
  }

  @action
  public onMountFailPage(): void {
    logger.trace('onMountFailPagePage');
  }

  @action
  public onMountFinalizingTransferPage(): void {
    logger.trace('onMountFinalizingTransferPage');

    var deviceId = Number(this.transferredDevice?.id);
    if (Number.isNaN(deviceId)) return;

    global.stores.dialog.askQuesting({
      bodyMessage: 'لطفا نام دستگاه خود را انتخاب کنید',
      onConfirm: async deviceName => {
        api.v1.device.update({
          name: deviceName,
          id: deviceId,
        });
        this.setDeviceName(deviceName);
      },
      inputPreprocessor: deviceName => Preprocessor.preprocessInput(deviceName),
      inputValuator: deviceName => Validator.validateDeviceName(deviceName),
      placeHolder: 'نام دستگاه',
    });
  }

  @action
  public onPressSelectUserWifiButton(wifi: WiFi, password: string): void {
    logger.trace(
      `onPressSelectUserWifiButton: with ssid: ${wifi.ssid}, with password: ${password}`,
    );

    this.selectedWiFi = wifi;
    this.selectedWiFiPassword = password;

    this._navigateToPage(AddDeviceSteps.ConfiguringDevice);
  }

  @action
  public onPressReloadCurrentWiFiButton(): void {
    logger.trace('onPressReloadCurrentWiFiButton');
  }

  @action
  public cancelDeviceConfigProcess(): void {
    this._isEsptouchSmartConfigCancelled = true;
    EsptouchSmartConfig.stop();
    clearTimeout(this._esptouchSmartConfigTimeoutReference);
    this._clearCountdown();
    this._navigateToPage(AddDeviceSteps.SelectingUserWifi);
  }

  @action
  public async returnToMenuPage() {
    this.finalizingTransferPageIsLoading = true;

    await global.services.devicesService.loadDevicesOnline();
    await global.stores.menu.initialize();
    navigate('Menu');

    this.finalizingTransferPageIsLoading = false;
  }

  @action
  public getLocationPermission(): void {
    GetPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(result => {
        this.locationPermissionStatus = result == PermissionsAndroid.RESULTS.GRANTED;
      })
      .catch(() => {
        this.locationPermissionStatus = false;
      });
  }

  @action
  private _navigateToPage(page: AddDeviceSteps): void {
    logger.trace('navigateToPage', AddDeviceSteps[page]);
    this.addDeviceCurrentPage = page;
  }

  @action
  public goBack(): void {
    logger.trace('goBack:', AddDeviceSteps[this.addDeviceCurrentPage]);
    this._clearCountdown();

    switch (this.addDeviceCurrentPage) {
      case AddDeviceSteps.SelectingUserWifi: {
        navigate('Menu');
        return;
      }
      case AddDeviceSteps.ConfiguringDevice: {
        this._navigateToPage(AddDeviceSteps.SelectingUserWifi);
        this.cancelDeviceConfigProcess();
        return;
      }
      case AddDeviceSteps.FinalizingTransfer: {
        this.returnToMenuPage();
        return;
      }
      case AddDeviceSteps.FailedPage: {
        this._navigateToPage(AddDeviceSteps.SelectingUserWifi);
        return;
      }
    }
  }

  @action
  public onMountSelectingUserWifiPage(): void {
    logger.trace('onMountSelectingUserWifiPage');
  }

  @observable transferredDevice?: Device;

  @action
  public async onMountDeviceConfigPage(): Promise<void> {
    logger.trace('onMountDeviceConfigPage');

    if (this.selectedWiFi == null) return;

    this.configDeviceProgressPageItems = [
      {
        text: 'ارسال اطلاعات WiFi به دستگاه',
        status: 'loading',
      },
      {
        text: 'برسی اطلاعات دستگاه',
        status: 'loading',
      },
      {
        text: 'ثبت دستگاه برای کاربر',
        status: 'loading',
      },
    ];

    try {
      const result = await this._sendDeviceConfiguration(
        this.selectedWiFi,
        this.selectedWiFiPassword,
      );
      this._finishConfigDeviceProgress(0);
      const device = await this._retrieveDeviceInfoByMacAddress(result.BSSID);
      this._finishConfigDeviceProgress(1);
      this.transferredDevice = await this._transferOwnerOfDevice(device);
      this.deviceName = this.transferredDevice.name;
      this._finishConfigDeviceProgress(2);
      this._navigateToPage(AddDeviceSteps.FinalizingTransfer);
    } catch (error) {
      logger.error(error);
      this._failConfigDeviceProgressIfLoading(0);
      this._failConfigDeviceProgressIfLoading(1);
      this._failConfigDeviceProgressIfLoading(2);
    }
  }

  @action
  public resetStore() {
    this._clearCountdown();
    clearTimeout(this._esptouchSmartConfigTimeoutReference);
    this.addDeviceCurrentPage = AddDeviceSteps.SelectingUserWifi;
    this.failPageMessage = '';
    this.configDeviceProgressPageItems = [];
  }
}

export interface InjectedAddDeviceStore {
  addDevice: AddDeviceStore;
}
