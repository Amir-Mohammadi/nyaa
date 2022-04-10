import { Permission, PermissionsAndroid } from 'react-native';

export const CheckPermission = async (permission: Permission): Promise<boolean> => {
  try {
    return await PermissionsAndroid.check(permission);
  } catch (error) {
    return false;
  }
};

export const GetPermission = async (permission: Permission) => {
  try {
    const granted = await PermissionsAndroid.request(permission);

    return granted;
  } catch (error) {
    return false;
  }
};
