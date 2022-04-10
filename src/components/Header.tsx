import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily, FontSize } from '../constants/Fonts';
import Layout from '../constants/Layout';
import Icon from './icons/Icons';

interface Props {
  title: string;
  action: () => any;
  secondButton?: {
    icon: string;
    action: Function;
  };
}
export type HeaderProps = Props;
const Header: FC<HeaderProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        <TouchableOpacity onPress={props.action}>
          <Icon size={30} color="#808080" name="back" />
        </TouchableOpacity>
      </View>
      <View style={styles.textView}>
        <Text style={styles.textValue}>{props.title}</Text>
      </View>
      {props.secondButton ? (
        <View style={styles.action}>
          <TouchableOpacity onPress={() => props.secondButton!.action()}>
            <Icon size={30} color="#808080" name={props.secondButton.icon} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Layout.scaleY(140),
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: {
    paddingLeft: 39.14,
    position: 'absolute',
    left: 0,
    flex: 1,
  },
  action: { paddingRight: 39.14, position: 'absolute', right: 0, flex: 1 },
  textView: {
    alignItems: 'center',
    alignContent: 'center',
    flex: 10,
  },
  textValue: {
    color: '#808080',
    fontSize: FontSize.medium,
    fontFamily: FontFamily.DiodrumArabic.Medium,
  },
});
export default Header;
