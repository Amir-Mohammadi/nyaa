import { AxiosError } from 'axios';
import { Persian } from '../ApiResponseMessage';
import Logger from '../Logger';
import { showToastAndroid } from '../ToastAndroidHandler';

const logger = new Logger('ApiErrorHandler');

let isSuppressedApiToast = false;
export const setSuppressedApiToast = (suppressedApiToast: boolean) => {
  isSuppressedApiToast = suppressedApiToast;
};

class ErrorHandlerService {
  public apiHandelError(error: AxiosError) {
    if (error.response) {
      logger.jsonError(error.response);

      const errorMessage = error.response.data.message;
      const message =
        //@ts-ignore
        Persian[errorMessage] ||
        errorMessage ||
        //@ts-ignore
        Persian[error.response.data.errors] ||
        'مشکلی در سرور پیش آمده است';

      if (!isSuppressedApiToast) showToastAndroid(message);
    } else if (error.request) {
      logger.jsonError(error.request);
      if (global.services.netInfoService.hasInternet) {
        if (!isSuppressedApiToast) showToastAndroid('پاسخی از سرور دریافت نشد');
      } else {
        if (!isSuppressedApiToast) showToastAndroid('اتصال به اینترنت برقرار نیست');
      }
    } else {
      logger.error(error);
      if (!isSuppressedApiToast)
        showToastAndroid('مشکلی در برنامه پیش آمده است، لطفا دوباره تلاش کنید');
    }
  }
}

export default ErrorHandlerService;
