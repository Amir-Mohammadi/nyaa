import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';
import { FontFamily, FontSize } from '../constants/Fonts';

interface Props {
  title: string;
  color: string;
  height: number;
  onPress: () => any;
  isLoading?: boolean;
  isDisable?: boolean;
}

export type ButtonProps = Props;

const Button: React.FC<ButtonProps> = props => {
  return (
    <Pressable
      onPress={props.onPress}
      android_ripple={{ color: '#fff' }}
      disabled={props.isLoading || props.isDisable}
      style={styles(props).pressableArea}>
      {props.isLoading ? (
        <ActivityIndicator size="small" color={props.color} />
      ) : (
        <Text style={styles(props).pressableAreaValue}>{props.title}</Text>
      )}
    </Pressable>
  );
};
const styles = (props: ButtonProps) =>
  StyleSheet.create({
    pressableArea: {
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: props.height / 1.5,
      height: props.height,
      backgroundColor: props.isLoading || props.isDisable ? Colors.disable : props.color,
      borderRadius: props.height,
    },
    pressableAreaValue: {
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.SemiBold,
      color: '#fff',
    },
  });
export default Button;
