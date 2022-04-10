import React, { FC } from 'react';
import { View } from 'react-native';
import Buttons from './buttons';
import Slider from './slider';

interface Props {
  color: string;
  range: [number, number];
  value: number;
  action: Function;
  height: number;
  increase: Function;
  decrease: Function;
  animation?: boolean;
}

export type TemperatureSliderProps = Props;
const TemperatureSlider: FC<TemperatureSliderProps> = props => {
  return (
    <View>
      <Slider
        animation={props.animation}
        range={props.range}
        value={props.value}
        action={() => {}}
        color={props.color}
      />
      <Buttons height={props.height} increase={props.increase} decrease={props.decrease} />
    </View>
  );
};
export default TemperatureSlider;
