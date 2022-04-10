import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';

interface Props {
  value: string;
  info: string;
}
export type InfoItemProps = Props;
const InfoItem: FC<InfoItemProps> = (props) => {
  return (
    <View style={styles(props).item}>
      <View>
        <Text style={styles(props).mainText}>{props.value}</Text>
      </View>
      <View>
        <Text style={styles(props).subText}>{props.info}</Text>
      </View>
    </View>
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
      paddingRight: Layout.scaleY(70),
      paddingLeft: Layout.scaleY(70),
      paddingVertical: 18,
    },

    mainText: {
      textAlign: 'left',
      fontFamily: FontFamily.DiodrumArabic.Medium,
      fontSize: FontSize.medium,
    },

    subText: {
      color: '#808080',
      textAlign: 'left',
      fontFamily: FontFamily.DiodrumArabic.Regular,
      fontSize: FontSize.medium,
    },
  });

export default InfoItem;
