import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import Icons from '../icons/Icons';

interface Props {
  title: string;
  onPress: () => any;
  disable?: boolean;
}

export type SettingMenuNavigationItemProps = Props;
const SettingMenuNavigationItem: FC<SettingMenuNavigationItemProps> = props => {
  const disable = props.disable ?? false;

  return (
    <TouchableOpacity disabled={disable} onPress={props.onPress}>
      <View style={[styles.item, disable ? styles.disable : {}]}>
        <View style={styles.mainTextView}>
          <Text style={styles.mainText}>{props.title}</Text>
        </View>
        <View style={styles.icon}>
          <Icons name="flesh" size={Layout.scaleX(30)} color="#808080" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#999999',
    paddingHorizontal: Layout.scaleX(50),
    paddingVertical: Layout.scaleY(40),
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
  disable: {
    backgroundColor: '#ddd',
    opacity: 0.5,
  },
});

export default SettingMenuNavigationItem;
