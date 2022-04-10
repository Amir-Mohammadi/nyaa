import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';

interface Props {
  title: string;
  info: string;
}
export type InfoItemProps = Props;
const SettingMenuItemWithInfo: FC<InfoItemProps> = (props) => {
  return (
    <View style={styles(props).item}>
      <View>
        <Text style={styles(props).mainText}>{props.title}</Text>
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
      paddingHorizontal: Layout.scaleX(50),
      paddingVertical: Layout.scaleY(40),
    },

    mainText: {
      textAlign: 'left',
      fontFamily: FontFamily.DiodrumArabic.Regular,
      fontSize: FontSize.medium,
    },

    subText: {
      color: '#808080',
      textAlign: 'left',
      fontFamily: FontFamily.DiodrumArabic.Light,
      fontSize: FontSize.medium,
    },
  });

export default SettingMenuItemWithInfo;
