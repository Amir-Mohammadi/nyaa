import { Config } from '../Config';
var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
var arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

export const commonUtils = {
  url: (version: number, resource: string, resourceId?: string | number) =>
    `${Config.AGENT_DEFAULT_URL}/api/v${version}/${resource}${resourceId ? '/' + resourceId : ''}`,

  convertTheArabicNumberToEnglish: (input: string) => {
    for (var i = 0; i < 10; i++) {
      var j = i.toString();
      input = input.replace(persianNumbers[i], j).replace(arabicNumbers[i], j);
    }
    return input;
  },
};
