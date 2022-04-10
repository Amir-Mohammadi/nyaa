import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Layout from '../constants/Layout';
import { InjectedNavigationProps } from '../utils/models';
import Icon from './icons/Icons';

type Props = InjectedNavigationProps;
export type HumbuggerButton = Props;
const HumbuggerButton: FC<HumbuggerButton> = (props) => {
  return (
    <View style={styles().hamburger}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Icon name="hamberger" size={Layout.scaleX(45)} color="#808080" />
      </TouchableOpacity>
    </View>
  );
};
const styles = () =>
  StyleSheet.create({
    hamburger: {
      backgroundColor: '#f2f2f2',
      padding: Layout.scaleY(5),
      borderRadius: Layout.scaleY(5),
      position: 'absolute',
      top: Layout.scaleY(25),
      left: Layout.scaleX(25),
      zIndex: 999999,
    },
  });
export default HumbuggerButton as any;
