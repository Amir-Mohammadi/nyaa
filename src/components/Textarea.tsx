import React, { FC, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props {
  color: string;
  placeholder: string;
  size: { width: number; height: number };
  fontSize: number;
}

export type InputProps = Props;
const Input: FC<InputProps> = (props) => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      style={styles(props).mainText}
      underlineColorAndroid="transparent"
      placeholder={props.placeholder}
      placeholderTextColor={'#9E9E9E'}
      numberOfLines={1}
      multiline={true}
      value={value}
      onChangeText={(text) => setValue(text)}
    />
  );
};
const styles = (props: any) =>
  StyleSheet.create({
    mainText: {
      borderWidth: 1,
      borderRadius: 25,
      borderColor: props.color,
      width: props.size.width,
      height: props.size.height,
      textAlign: 'center',
      fontSize: props.fontSize,
    },
  });
export default Input;
