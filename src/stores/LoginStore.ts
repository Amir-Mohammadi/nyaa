import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { action, observable } from 'mobx';
import api, { VerifiedAccount } from '../api';
import { Config } from '../Config';
import Logger from '../utils/Logger';
import { AsyncStoreKeys } from '../utils/models';
import { Preprocessor } from '../utils/preprocessor';
import Validator from '../utils/validator';
import { Store } from './core/Store';

var logger = new Logger('LoginStore');
export class AuthStore extends Store {
  @observable phoneNumber: string = '';
  @observable verifyCode: string = '';
  @observable idCode: string = '';
  @observable firstName: string = '';
  @observable lastName: string = '';
  @observable password: string = '';
  @observable passwordConfirm: string = '';
  @observable errorMessage: string = '';
  @observable errorFirstNameMessage: string = '';
  @observable errorLastNameMessage: string = '';
  @observable errorPasswordMessage: string = '';
  @observable step: number = 0;
  @observable authenticated: boolean = false;
  @observable disabled: boolean = false;
  @observable isSeasonChecked: boolean = false;
  @observable code: string = '';
  @observable isLoggedIn: boolean = false;
  @observable isIntroWatched: boolean = true;

  @action setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  @action updatePhoneNumber(text: string) {
    text.trim();
    this.phoneNumber = text;
    this.errorMessage = '';
  }

  @action updateVerifyCode(text: string) {
    text.trim();
    this.verifyCode = text;
    this.errorMessage = '';
  }
  @action updateIdCode(text: string) {
    text.trim();
    this.idCode = text;
    this.errorMessage = '';
  }
  @action updateFirstName(text: string) {
    text.trim();
    this.firstName = text;
    this.errorFirstNameMessage = '';
  }
  @action updateLastName(text: string) {
    text.trim();
    this.lastName = text;
    this.errorLastNameMessage = '';
  }
  @action updatePassword(text: string) {
    this.password = text;
  }
  @action updatePasswordConfirm(text: string) {
    this.passwordConfirm = text;
  }

  @action setStep() {
    this.step = 0;
  }

  @action emptyErrors() {
    this.errorMessage = '';
  }

  async phoneNumberValidate() {
    this.clearErrorMessage();

    const phoneNumber = Preprocessor.preprocessPhoneNumber(this.phoneNumber);
    const phoneNumberValidationResult = Validator.validatePhoneNumber(phoneNumber);

    if (!phoneNumberValidationResult.isValid) {
      this.errorMessage = phoneNumberValidationResult.errorMessage;
    } else {
      try {
        this.disabled = true;

        var res = await api.v1.accounts.verifyPhone({
          phone: phoneNumber,
        });
        // debug code **********************************************************************
        if (__DEV__) {
          var response = await Axios.get(
            Config.AGENT_DEFAULT_URL + '/api/v1/debug/recieve-code/' + phoneNumber,
          );
          this.verifyCode = response.data + '';
        }
        // *********************************************************************************
        this.step = 1;
        logger.debug('Phone Number validated');
      } catch (error) {
        logger.error('Phone Number validate Fail \n', error);
      } finally {
        this.disabled = false;
      }
    }
  }

  setAsyncStoreData(response: VerifiedAccount) {
    AsyncStorage.setItem(AsyncStoreKeys.TOKEN, response.token);
    AsyncStorage.setItem(AsyncStoreKeys.PRIVATE_KEY, response.privateKey);
    global.services.userService.setToken(response.token);
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.errorFirstNameMessage = '';
    this.errorLastNameMessage = '';
    this.errorPasswordMessage = '';
  }

  async phoneNumberCodeValidate() {
    this.clearErrorMessage();

    const phoneNumber = Preprocessor.preprocessPhoneNumber(this.phoneNumber);
    const verifyCode = Preprocessor.preprocessInput(this.verifyCode);
    const verifyCodeValidationResult = Validator.validateInput(verifyCode);

    if (!verifyCodeValidationResult.isValid) {
      this.errorMessage = verifyCodeValidationResult.errorMessage;
    } else {
      try {
        this.disabled = true;

        var res = await api.v1.accounts.verifyCode({
          phone: phoneNumber,
          code: verifyCode,
        });

        if (res.isRegistered == true) {
          logger.debug('user successfully logged in');
          await global.services.userService.setToken(res.token);
          this.errorMessage = '';
          this.authenticated = true;
          await global.services.userService.loadUserOnline();
          global.stores.splash.checkSession();
          this.isLoggedIn = true;
        } else if (res.isRegistered == false) {
          logger.debug('user not registered');
          this.errorMessage = '';
          this.step = 2;
        } else {
          this.errorMessage = 'مشکلی در ثبت درخواست شما پیش آمده';
        }
      } catch (error) {
        logger.error('phoneNumberCodeValidate:', error);
      } finally {
        this.disabled = false;
      }
    }
  }

  async personalDataValidate() {
    this.clearErrorMessage();
    var hasError = false;

    const firstName = Preprocessor.preprocessInput(this.firstName);
    const firstNameValidationResult = Validator.validateName(firstName);

    const lastName = Preprocessor.preprocessInput(this.lastName);
    const lastNameValidationResult = Validator.validateLastName(lastName);

    const nationalCode = Preprocessor.preprocessInput(this.idCode);
    const nationalCodeValidationResult = Validator.validateNationalCode(nationalCode);

    const verifyCode = Preprocessor.preprocessInput(this.verifyCode);
    const phoneNumber = Preprocessor.preprocessInput(this.phoneNumber);

    if (!nationalCodeValidationResult.isValid) {
      this.errorMessage = nationalCodeValidationResult.errorMessage;
      hasError = true;
    }

    if (!firstNameValidationResult.isValid) {
      this.errorFirstNameMessage = firstNameValidationResult.errorMessage;
      hasError = true;
    }

    if (!lastNameValidationResult.isValid) {
      this.errorLastNameMessage = lastNameValidationResult.errorMessage;
      hasError = true;
    }

    if (hasError) return;

    try {
      this.disabled = true;

      var res = await api.v1.accounts.register({
        phone: phoneNumber,
        first_name: firstName,
        last_name: lastName,
        national_code: nationalCode,
        code: verifyCode,
      });

      await global.services.userService.setToken(res.token);
      await global.services.userService.loadUserOnline();
      global.stores.splash.checkSession();

      this.authenticated = true;
      this.isLoggedIn = true;

      logger.debug('user registered successfully!');
    } catch (error) {
      logger.error('personal Data Validate', error);
      await global.stores.splash.checkSession();
    } finally {
      this.disabled = false;
    }
  }

  @action validate() {
    if (this.step == 0) {
      this.phoneNumberValidate();
    } else if (this.step == 1) {
      this.phoneNumberCodeValidate();
    } else if (this.step == 2) {
      this.personalDataValidate();
    }
  }
}

export interface InjectedAuthStore {
  auth: AuthStore;
}
