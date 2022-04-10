export class Preprocessor {
  private static persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  private static arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

  private static _convertTheArabicNumberToEnglish(input: string) {
    for (var i = 0; i < 10; i++) {
      input = input.replace(this.persianNumbers[i], i + '').replace(this.arabicNumbers[i], i + '');
    }
    return input;
  }

  public static preprocessInput(input: string): string {
    input = input.trim();
    input = this._convertTheArabicNumberToEnglish(input);
    return input;
  }

  public static preprocessPhoneNumber(phoneNumber: string): string {
    phoneNumber = this.preprocessInput(phoneNumber);

    if (!phoneNumber.startsWith('0')) {
      phoneNumber = '0' + phoneNumber;
    }

    return phoneNumber;
  }
}
