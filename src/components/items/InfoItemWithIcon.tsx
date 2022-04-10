import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import Icon from '../icons/Icons';
interface Props {
  value: string;
  action: () => any;
  info: string;
  disable: boolean;
}
export type InfoItemProps = Props;
const InfoItem: FC<InfoItemProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.action} disabled={props.disable}>
      <View style={styles(props).item}>
        <View style={styles(props).mainTextView}>
          <Text style={styles(props).mainText}>{props.value}</Text>

          <Text style={styles(props).subText}>{props.info}</Text>
        </View>

        <View style={styles(props).icon}>
          <Icon name="flesh" size={Layout.scaleX(30)} color="#808080" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    item: {
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
      paddingRight: 50,
      paddingVertical: 18,
    },
    mainTextView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      paddingHorizontal: 50,
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    mainText: {
      textAlign: 'left',
    },

    subText: {
      color: '#808080',
      textAlign: 'left',
    },
    icon: {},
  });

export default InfoItem;
