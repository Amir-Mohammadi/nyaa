import axios, { AxiosResponse } from 'axios';
import { commonUtils } from '../utils/CommonUtils';
import Logger from '../utils/Logger';
import {
  Account,
  Device,
  DevicesPage,
  NewAccount,
  Page,
  PublicDeviceInfo,
  RequestSharedDevice,
  SharedDevice,
  Topic,
  TransferOwner,
  UpdatedDevice,
  UpdateDevice,
  User,
  VerifiedAccount,
  VerifyCode,
  VerifyPhone,
  VerifyTransfer,
} from './models';
const { url } = commonUtils;
const logger = new Logger('API');

class Api {
  private getAuthorizationHeader = async () => {
    try {
      var token = await global.services.userService.getToken();
      if (!token) throw new Error('token not found');
      return {
        Authorization: `Bearer ${token}`,
      };
    } catch (e) {
      logger.error(e);
    }
  };

  Api = axios.create({
    timeout: 8000,
  });

  v1 = {
    accounts: {
      register: async (newAccount: NewAccount) => {
        try {
          const resp: AxiosResponse<Account> = await this.Api.post(
            url(1, 'users', 'register'),
            newAccount,
          );
          return resp.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },

      verifyPhone: async (verifyPhone: VerifyPhone) => {
        try {
          const res: AxiosResponse<{ message: string }> = await this.Api.post(
            url(1, 'users', 'verify-phone'),
            verifyPhone,
          );
          return res.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },

      verifyCode: async (verifyCode: VerifyCode) => {
        try {
          const resp: AxiosResponse<VerifiedAccount> = await this.Api.post(
            url(1, 'users', 'verify-code'),
            verifyCode,
          );
          return resp.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },

      getCurrentUser: async (silence: boolean = false) => {
        try {
          var token = await this.getAuthorizationHeader();
          var response: AxiosResponse<User> = await this.Api.get(url(1, 'users', 'current'), {
            headers: token,
          });
          return response.data;
        } catch (error) {
          if (!silence) {
            global.services.errorHandler.apiHandelError(error);
          }
          throw error;
        }
      },
    },
    device: {
      devices: async (silence: boolean = false) => {
        try {
          var token = await this.getAuthorizationHeader();
          var response: AxiosResponse<DevicesPage> = await this.Api.get(`${url(1, 'devices')}`, {
            headers: token,
          });
          return response.data.data;
        } catch (error) {
          if (!silence) {
            global.services.errorHandler.apiHandelError(error);
          }
          throw error;
        }
      },

      getDeviceInfoByMac: async (mac: String, timeout: number = 8000, silence: boolean = false) => {
        try {
          const response: AxiosResponse<PublicDeviceInfo> = await this.Api.get(
            url(1, `devices/mac/${mac}`),
            {
              timeout: timeout,
            },
          );
          return response.data;
        } catch (error) {
          if (!silence) {
            global.services.errorHandler.apiHandelError(error);
          }
          throw error;
        }
      },

      show: async (deviceId: number) => {
        try {
          const auth = await this.getAuthorizationHeader();
          const resp: AxiosResponse<Device> = await this.Api.get(
            `${url(1, 'devices')}/${deviceId}`,
            {
              headers: auth,
            },
          );
          return resp.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },

      update: async (updateDevice: UpdateDevice) => {
        try {
          var token = await this.getAuthorizationHeader();
          var response: AxiosResponse<UpdatedDevice> = await this.Api.put(
            `${url(1, 'devices')}/${updateDevice.id}`,
            updateDevice,
            {
              headers: token,
            },
          );
          return response.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },

      topics: async (typeId: number) => {
        try {
          const auth = await this.getAuthorizationHeader();
          const resp: AxiosResponse<Array<Topic>> = await this.Api.get(
            `${url(1, 'device-types/template')}/${typeId}`,
            {
              headers: auth,
            },
          );
          return resp.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },

      delete: async (id: number) => {
        try {
          const authorizationHeader = await this.getAuthorizationHeader();
          const response: AxiosResponse<{ message: string }> = await this.Api.delete(
            url(1, `devices/${id}`),
            {
              headers: authorizationHeader,
            },
          );
          return response.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },
    },

    ownerCheck: {
      transferOwner: async (transferOwner: TransferOwner) => {
        try {
          const auth = await this.getAuthorizationHeader();
          const resp: AxiosResponse<TransferOwner> = await this.Api.post(
            url(1, `devices/${transferOwner.device_id}/owner/transfer`),
            null,
            {
              headers: auth,
            },
          );
          return resp.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },

      verifyTransfer: async (verifyTransfer: VerifyTransfer, timeout: number = 10000) => {
        try {
          const auth = await this.getAuthorizationHeader();
          const params = {
            verify_token: verifyTransfer.verify_token,
          };
          const resp: AxiosResponse<Device> = await this.Api.post(
            url(1, `devices/${verifyTransfer.device_id}/owner/verify`),
            params,
            {
              headers: auth,
              timeout: timeout,
            },
          );
          return resp.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },
    },
    sharedDevice: {
      sharedDevices: async (deviceId: number) => {
        try {
          const authorizationHeader = await this.getAuthorizationHeader();
          const response: AxiosResponse<Page<SharedDevice>> = await this.Api.get(
            url(1, `devices/sharing/${deviceId}`),
            {
              headers: authorizationHeader,
            },
          );
          return response.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },
      request: async (request: RequestSharedDevice) => {
        try {
          const authorizationHeader = await this.getAuthorizationHeader();
          const response: AxiosResponse<SharedDevice> = await this.Api.post(
            url(1, `devices/sharing/request`),
            request,
            {
              headers: authorizationHeader,
            },
          );
          return response.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },

      delete: async (id: number) => {
        try {
          const authorizationHeader = await this.getAuthorizationHeader();
          const resp: AxiosResponse<{ message: string }> = await this.Api.delete(
            url(1, `devices/sharing/${id}`),
            {
              headers: authorizationHeader,
            },
          );
          return resp.data;
        } catch (error) {
          global.services.errorHandler.apiHandelError(error);
          throw error;
        }
      },
    },
  };
}

const api = new Api();
export * from './models';
export type V1 = typeof api.v1;
export default api;
