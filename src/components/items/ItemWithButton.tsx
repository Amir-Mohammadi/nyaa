import React, { FC } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';

interface Props {
  value: string;
  action: Function;
  buttonTextColor: string;
  buttonText: string;
}
export type SimpleItemProps = Props;
const ItemWithButton: FC<SimpleItemProps> = (props) => {
  return (
    <View style={styles(props).item}>
      <Text style={styles(props).mainText}>{props.value}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          props.action();
        }}>
        <Text style={styles(props).buttonText}>{props.buttonText}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
      flexDirection: 'row',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    mainText: {
      color: props.color,
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    buttonText: {
      color: props.buttonTextColor,
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Medium,
    },
  });

export default ItemWithButton;
