import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Setting: undefined;
  Login: undefined;
  Menu: undefined;
};

export interface InjectedNavigationProps {
  navigation: NavigationProp<RootStackParamList> | any;
  route?: { params: any };
  state: any;
  descriptors: any;
}

export enum AsyncStoreKeys {
  TOKEN = '@token',
  PRIVATE_KEY = '@privateKey',
  SELECTED_DEVICE_ID = '@selectedDeviceId',
  SELECTED_DEVICE_INDEX = '@selectedDevice',
  LIST_OF_DEVICES = '@listOfDevice',
  USER = '@user',
  IS_INTRO_WATCHED = '@isIntroWatched-v1',
}

export type DeviceStatus = {
  signature: string;
  text: string;
  icon: string;
  toggle: boolean;
};
