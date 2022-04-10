import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import Icons from '../icons/Icons';
interface Props {
  value: string;
  action: () => any;
}
export type ItemWithIconProps = Props;
const ItemWithIcon: FC<ItemWithIconProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={styles(props).item}>
        <View style={styles(props).mainTextView}>
          <Text style={styles(props).mainText}>{props.value}</Text>
        </View>
        <View style={styles(props).icon}>
          <Icons name="flesh" size={Layout.scaleX(30)} color="#808080" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = (props: any) =>
  StyleSheet.create({
    item: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'center',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
      paddingHorizontal: 50,
      paddingVertical: 18,
    },
    mainTextView: {
      flex: 7,
    },
    mainText: {
      textAlign: 'left',
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    icon: {
      justifyContent: 'center',
      flex: 1,
    },
  });
export default ItemWithIcon;
