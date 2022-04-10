import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeTabBar from '../../components/HomeTabBar';
import HumbuggerButton from '../../components/HumbuggerButton';
import OverlayMessage from '../../components/OverlayMessage';
import { DeviceUpperMenuType } from '../../constants/DeviceTypes';
import { InjectedMenuStore } from '../../stores';
import DeviceStatusMenu from './DeviceStatusMenu';
import FreezerTab from './home-tab-bar/FreezerTab';
import FridgeTab from './home-tab-bar/FridgeTab';
import MediaTab from './home-tab-bar/MediaTab';
import SideMenu from './SideMenu';

const Tab = createMaterialTopTabNavigator();

interface HomeTabStackProps {
  tabList: Array<DeviceUpperMenuType>;
}

const HomeTabStack: React.FC<HomeTabStackProps> = props => (
  <Tab.Navigator tabBar={props => <HomeTabBar {...props} />}>
    <Tab.Screen name="Fridge" component={FridgeTab} />
    <Tab.Screen name="Media" component={MediaTab} />
    <Tab.Screen name="Freezer" component={FreezerTab} />
    {/* {props.tabList.includes('Fridge') ? <Tab.Screen name="Fridge" component={FridgeTab} /> : null} */}
    {/* {props.tabList.includes('Media') ? <Tab.Screen name="Media" component={MediaTab} /> : null} */}
    {/* {props.tabList.includes('Image') ? <Tab.Screen name="Image" component={ImageViewTab} /> : null} */}
    {/* {props.tabList.includes('Freezer') ? (
      <Tab.Screen name="Freezer" component={FreezerTab} />
    ) : null} */}
  </Tab.Navigator>
);

@inject('menu')
@observer
class HomeScreen extends Component<InjectedMenuStore> {
  homePage() {
    return (
      <View style={styles.constrainer}>
        <HomeTabStack tabList={this.props.menu.upperMenuPages} />
        <DeviceStatusMenu {...this.props} />
        <OverlayMessage message={this.props.menu.overlayScreenMessage} />
        <SideMenu {...this.props} />
        <HumbuggerButton {...this.props} />
      </View>
    );
  }

  render() {
    return this.homePage();
  }
}

const styles = StyleSheet.create({
  constrainer: {
    flex: 1,
  },
});

export default HomeScreen;
