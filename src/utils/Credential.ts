import { encode } from 'base-64';
import { sha1 } from 'react-native-sha1';

export const CreatCredential = async (user: {
  privateKey: string;
  nationalCode: string;
  phone: string;
}) => {
  var hash = await sha1(`${user.privateKey}${user.nationalCode}${user.phone}`);
  return encode(hash.toLowerCase());
};
