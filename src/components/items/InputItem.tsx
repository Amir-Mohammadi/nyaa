import React, { FC } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';

interface Props {
  value: string;
  height: number;
  labelText: string;
  placeholder?: string;
  onChange: Function;
  secureTextEntry: boolean;
  defaultValue?: string;
}
export type SimpleItemProps = Props;
const ItemWithButton: FC<SimpleItemProps> = (props) => {
  return (
    <View style={styles(props).item}>
      {props.labelText == '' ? null : <Text style={styles(props).mainText}>{props.labelText}</Text>}
      <TextInput
        style={{
          borderWidth: 0.5,
          borderColor: '#999999',
          width: props.height * 5.46,
          height: props.height,
          textAlign: 'center',
          fontSize: FontSize.medium,
          fontFamily: FontFamily.DiodrumArabic.Regular,
          padding: 0,
        }}
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        onChangeText={(text) => props.onChange(text)}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    mainText: {
      color: props.color,
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    buttonText: {
      color: props.buttonTextColor,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ItemWithButton;
