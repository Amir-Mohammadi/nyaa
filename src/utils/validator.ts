export type ValidateResult =
  | {
      isValid: false;
      errorMessage: string;
    }
  | {
      isValid: true;
    };

export default class Validator {
  private static _phoneRegex = /^(0)?9\d{9}$/;

  private static _validateNationalCode(nationalCode: string): boolean {
    const nationalCodeLength = nationalCode.length;

    if (nationalCodeLength < 8 || parseInt(nationalCode, 10) == 0) return false;

    if (nationalCodeLength === 10) {
      if (
        nationalCode === '0000000000' ||
        nationalCode === '1111111111' ||
        nationalCode === '2222222222' ||
        nationalCode === '3333333333' ||
        nationalCode === '4444444444' ||
        nationalCode === '5555555555' ||
        nationalCode === '6666666666' ||
        nationalCode === '7777777777' ||
        nationalCode === '8888888888' ||
        nationalCode === '9999999999'
      ) {
        return false;
      }

      nationalCode = ('0000' + nationalCode).substr(nationalCodeLength + 4 - 10);
      if (parseInt(nationalCode.substr(3, 6), 10) == 0) return false;

      var c = parseInt(nationalCode.substr(9, 1), 10);
      var s = 0;
      for (var i = 0; i < 9; i++) s += parseInt(nationalCode.substr(i, 1), 10) * (10 - i);
      s = s % 11;

      if ((s < 2 && c == s) || (s >= 2 && c == 11 - s)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public static validateNationalCode(nationalCode: string): ValidateResult {
    const baseValidateResult = this.validateInput(nationalCode);
    if (!baseValidateResult.isValid) return baseValidateResult;

    if (this._validateNationalCode(nationalCode)) {
      return {
        isValid: false,

        errorMessage: 'شماره ملی وارد شده معتبر نمی باشد',
      };
    }

    return {
      isValid: true,
    };
  }

  public static validateInput(input: string): ValidateResult {
    if ('' == input) {
      return {
        isValid: false,
        errorMessage: 'ورودی نمی تواند خالی باشد',
      };
    }

    return {
      isValid: true,
    };
  }
  public static validateLastName(lastName: string): ValidateResult {
    const baseValidateResult = this.validateInput(lastName);
    if (!baseValidateResult.isValid) return baseValidateResult;

    if (lastName.length < 3) {
      return {
        isValid: false,
        errorMessage: 'نام خانوادگی باید حداقل شامل 3 حرف باشد',
      };
    }

    return {
      isValid: true,
    };
  }

  public static validateName(name: string): ValidateResult {
    const baseValidateResult = this.validateInput(name);
    if (!baseValidateResult.isValid) return baseValidateResult;

    if (name.length < 3) {
      return {
        isValid: false,
        errorMessage: 'نام باید حداقل شامل 3 حرف باشد',
      };
    }

    return {
      isValid: true,
    };
  }

  public static validateDeviceName(deviceName: string): ValidateResult {
    const baseValidateResult = this.validateInput(deviceName);
    if (!baseValidateResult.isValid) return baseValidateResult;

    if (deviceName.length < 3) {
      return {
        isValid: false,
        errorMessage: 'نام دستگاه باید حداقل شامل 3 حرف باشد',
      };
    }

    return {
      isValid: true,
    };
  }

  public static validatePhoneNumber(phoneNumber: string): ValidateResult {
    const baseValidateResult = this.validateInput(phoneNumber);
    if (!baseValidateResult.isValid) return baseValidateResult;

    if (!this._phoneRegex.test(phoneNumber)) {
      return {
        isValid: false,
        errorMessage: 'شماره تلفن وارد شده معتبر نمی باشد',
      };
    }

    return {
      isValid: true,
    };
  }
}
