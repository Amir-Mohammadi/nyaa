import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../constants/Layout';
import { InjectedNavigationProps } from '../utils/models';
import SemiCircleMenu from './SemiCircleMenu';

export type MenuProps = InjectedNavigationProps;

const HomeTabBarComponent: FC<MenuProps> = (props) => {
  var upSemiCircleMenuList: any[] = [];

  props.state.routes.map((route: any, index: number) => {
    const { options } = props.descriptors[route.key];
    const label: string =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = props.state.index === index;

    const onPress = () => {
      const event = props.navigation.emit({
        type: 'tabPress',
        target: route.key,
      });

      if (!isFocused && !event.defaultPrevented) {
        props.navigation.navigate(route.name);
      }
    };
    const newItem = {
      text: label,
      icon: label.toLocaleLowerCase(),
      onPress: onPress,
      isFocused: isFocused,
    };
    upSemiCircleMenuList.push(newItem);
  });

  return (
    <View style={styles().topMain}>
      <View style={styles().topSemi}>
        <SemiCircleMenu
          buttons={upSemiCircleMenuList}
          width={Layout.window.width * 0.7}
          dock="up"
        />
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    topMain: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: Layout.scaleY(80),
    },
    topSemi: {
      alignItems: 'center',
    },
  });

export default HomeTabBarComponent;
