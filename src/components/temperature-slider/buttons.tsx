import React, { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from '../icons/Icons';

interface Props {
  height: number;
  increase: Function;
  decrease: Function;
}

export type TemperatureSliderProps = Props;

const TemperatureSlider: FC<TemperatureSliderProps> = (props) => {
  return (
    <View style={styles(props).icon}>
      <Pressable onPress={() => props.decrease()}>
        <View style={{ paddingRight: 20, marginHorizontal: -5 }}>
          <Icon name="tempraturedown" color="#999999" size={props.height / 3} />
        </View>
      </Pressable>

      <Pressable onPress={() => props.increase()}>
        <View style={{ paddingLeft: 20 }}>
          <Icon name="tempratureup" color="#999999" size={props.height / 3} />
        </View>
      </Pressable>
    </View>
  );
};
const styles = (props: any) =>
  StyleSheet.create({
    icon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
export default TemperatureSlider;
