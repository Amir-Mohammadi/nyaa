import React, { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { FontFamily, FontSize } from '../constants/Fonts';

interface Props {
  color: string;
  placeholder: string;
  height: number;
  onChange: Function;
  value: string;
  textColor?: string;
  secureTextEntry?: boolean;
  disable?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  inputmode:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
}
export type InputProps = Props;
const Input: FC<InputProps> = props => {
  return (
    <TextInput
      style={styles(props).mainText}
      value={props.value}
      autoCapitalize={props.autoCapitalize}
      onChangeText={value => props.onChange(value)}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.inputmode}
      editable={!props.disable}
      selectTextOnFocus={props.disable}
      caretHidden={props.disable}
      placeholderTextColor={'#999'}
    />
  );
};
const styles = (props: InputProps) =>
  StyleSheet.create({
    mainText: {
      borderWidth: 1,
      color: props.textColor ?? 'black',
      borderRadius: props.height / 2,
      borderColor: props.color,
      width: props.height * 4.25,
      height: props.height,
      textAlign: 'center',
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
      backgroundColor: 'white',
    },
  });
export default Input;
