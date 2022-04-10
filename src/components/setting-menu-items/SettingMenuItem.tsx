import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';

interface Props {
  title: string;
  action: () => any;
  disabled?: boolean;
}
export type SimpleItemProps = Props;
const SettingMenuItem: FC<SimpleItemProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.action} disabled={props.disabled}>
      <View style={[styles.item, props.disabled ? styles.disable : null]}>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#999999',
    paddingHorizontal: Layout.scaleX(50),
    paddingVertical: Layout.scaleY(40),
  },
  mainText: {
    color: 'black',
    fontSize: FontSize.medium,
    fontFamily: FontFamily.DiodrumArabic.Regular,
  },
  disable: {
    backgroundColor: '#ddd',
    opacity: 0.5,
  },
});

export default SettingMenuItem;
