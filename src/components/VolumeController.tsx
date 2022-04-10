import React from 'react';
import { Pressable, View } from 'react-native';
import Icons from './icons/Icons';

interface Props {
  volumeUp: () => any;
  volumeDown: () => any;
  height: number;
  mode: number;
}

export type VolumeControllerProps = Props;

const VolumeController: React.FC<VolumeControllerProps> = (props) => {
  var width = (76.01 / 195.7) * props.height;
  var margin = (21.84 / 195.7) * props.height;

  if (props.mode == 1 || props.mode == 2) {
    return (
      <View
        style={{
          width: 2.5 * width,
          height: props.height,
          flexDirection: 'row',
        }}>
        <Pressable
          style={{
            borderWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            height: width,
            borderRadius: 50,
            marginRight: margin,
          }}
          onPress={props.volumeDown}>
          <Icons name="volumedown" color="#00a99d" size={width} />
        </Pressable>
        <Pressable
          style={{
            borderWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            height: width,
            borderRadius: 50,
            marginLeft: margin,
          }}
          onPress={props.volumeUp}>
          <Icons name="volumeup" color="#00a99d" size={width} />
        </Pressable>
      </View>
    );
  }
  return (
    <View
      style={{
        width: 2.5 * width,
        height: props.height,
        flexDirection: 'row',
      }}>
      <Pressable
        style={{
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
          height: width,
          borderRadius: 50,
          marginRight: margin,
        }}
        onPress={props.volumeDown}>
        <Icons name="volumedown" color="#808080" size={width} />
      </Pressable>
      <Pressable
        style={{
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
          height: width,
          borderRadius: 50,
          marginLeft: margin,
        }}
        onPress={props.volumeUp}>
        <Icons name="volumeup" color="#808080" size={width} />
      </Pressable>
    </View>
  );
};

export default VolumeController;
