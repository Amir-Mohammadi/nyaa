import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const REF_UI_WIDTH = 705;
const REF_UI_HEIGHT = 1334;
const scaleX = (refW: number) => {
  return (refW / REF_UI_WIDTH) * width;
};
const scaleY = (refH: number) => {
  return (refH / REF_UI_HEIGHT) * height;
};

export default {
  window: {
    width,
    height,
  },
  scaleX,
  scaleY,
  isSmallDevice: width < 375,
};
