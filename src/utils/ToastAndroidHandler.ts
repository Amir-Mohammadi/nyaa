import { ToastAndroid } from 'react-native';

export const showToastAndroid = (message: string, duration = ToastAndroid.SHORT) => {
  ToastAndroid.showWithGravity(message, duration, ToastAndroid.CENTER);
};
