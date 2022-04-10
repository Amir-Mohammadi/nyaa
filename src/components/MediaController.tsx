import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Text } from 'react-native-svg';
import Icons from './icons/Icons';
interface Props {
  height: number;
  color: string;
  next: () => any;
  previous: () => any;
  play: () => any;
  mode: number;
  scan: () => any;
}

export type MediaControllerProps = Props;

const MediaController: React.FC<MediaControllerProps> = (props) => {
  switch (props.mode) {
    case 1: {
      return (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={props.previous}>
            <Icons name="previous" size={(1 / 3) * props.height} color={props.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.play}>
            <Icons name="play" size={props.height} color={props.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.next}>
            <Icons name="next" size={(1 / 3) * props.height} color={props.color} />
          </TouchableOpacity>
        </View>
      );
    }
    case 2: {
      return (
        <View style={styles(props).mainView}>
          <TouchableOpacity onPress={props.previous}>
            <Icons name="previous" size={(1 / 3) * props.height} color={props.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.scan}>
            <Svg viewBox="0 0 36.18 36.18" width={props.height} height={props.height}>
              <Circle
                cx={18.09}
                cy={18.09}
                r={17.84}
                fill={props.color}
                stroke="#fff"
                strokeMiterlimit={10}
                strokeWidth={0}
              />
              <Text textAnchor="middle" x={18.09} y={20} fontSize={6} fill="white">
                Scan
              </Text>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.next}>
            <Icons name="next" size={(1 / 3) * props.height} color={props.color} />
          </TouchableOpacity>
        </View>
      );
    }
    default: {
      return (
        <View style={styles(props).mainView}>
          <Icons name="previous" size={(1 / 3) * props.height} color="#808080" />
          <Svg viewBox="0 0 36.18 36.18" width={props.height} height={props.height}>
            <Circle
              cx={18.09}
              cy={18.09}
              r={17.84}
              fill="#808080"
              stroke="#fff"
              strokeMiterlimit={10}
              strokeWidth={0}
            />
            <Text textAnchor="middle" x={18.09} y={20} fontSize={6} fill="white">
              Off
            </Text>
          </Svg>

          <Icons name="next" size={(1 / 3) * props.height} color="#808080" />
        </View>
      );
    }
  }
};
const styles = (props: any) =>
  StyleSheet.create({
    mainView: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
export default MediaController;
