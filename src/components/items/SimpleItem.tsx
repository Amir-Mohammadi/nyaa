import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';

interface Props {
  value: string;
  action: () => any;
}
export type SimpleItemProps = Props;
const SimpleItem: FC<SimpleItemProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={styles(props).item}>
        <Text style={styles(props).mainText}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    mainText: {
      color: props.color,
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
  });

export default SimpleItem;
