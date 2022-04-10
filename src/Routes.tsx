import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoNetworkBar from './components/InternetStatus';
import AddDeviceScreen from './screens/add-device/AddDevice';
import DialogContainer from './screens/dialog/DialogContainer';
import DrawerContent from './screens/home/DrawerContent';
import Menu from './screens/home/Home';
import AppIntroSlider from './screens/intro-slider/intro-slider';
import Login from './screens/login/Login';
import DeviceErrorList from './screens/setting/DeviceErrorList';
import DeviceProfile from './screens/setting/DeviceProfileSetting';
import DeviceSettingScreen from './screens/setting/DeviceSetting';
import SharedDevices from './screens/setting/SharedDevices';
import { InjectedAuthStore, InjectedMenuStore } from './stores';
import { ComponentWithStore, connect } from './stores/core/decorator';
import Logger from './utils/Logger';
import { navigationRef } from './utils/RootNavigation';

const logger = new Logger('ROUTER');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeWithDevice = () => (
  <Drawer.Navigator initialRouteName="Menu" drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Menu" component={Menu} />
    <Drawer.Screen name="Setting" component={DeviceSettingScreen} />
  </Drawer.Navigator>
);

const HomeNoDevice = () => (
  <Drawer.Navigator initialRouteName="Menu" drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Menu" component={Menu} />
  </Drawer.Navigator>
);

type NavigatorProps = InjectedAuthStore & InjectedMenuStore;

@connect('auth')
@connect('menu')
@observer
class Navigator extends ComponentWithStore<NavigatorProps> {
  render() {
    const HomeDrawerMenuItems = () => {
      if (!this.stores.menu.noDevice) return HomeWithDevice;
      else return HomeNoDevice;
    };

    const isLoggedIn = this.stores.auth.isLoggedIn;

    logger.debug(
      `rendering router, loggerIn: ${this.stores.auth.isLoggedIn}, UserHaveAtLeastOneDevice: ${this.stores.menu.isUserHaveAtLeastOneDevice}`,
    );

    if (!this.stores.auth.isIntroWatched) {
      return <AppIntroSlider />;
    }

    return (
      <KeyboardAvoidingView style={styles.constrainer}>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView style={styles.constrainer}>
            <NoNetworkBar />
            <DialogContainer />
            <Stack.Navigator mode="modal" headerMode={'none'}>
              {isLoggedIn ? (
                <Fragment>
                  <Stack.Screen name="HomeDrawer" component={HomeDrawerMenuItems()} />
                  <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
                  <Stack.Screen name="DeviceSetting" component={DeviceSettingScreen} />
                  <Stack.Screen name="DeviceProfile" component={DeviceProfile} />
                  <Stack.Screen name="DeviceErrorList" component={DeviceErrorList} />
                  <Stack.Screen name="SharedDevices" component={SharedDevices} />
                </Fragment>
              ) : (
                <Fragment>
                  <Stack.Screen name="Login" component={Login} />
                </Fragment>
              )}
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  constrainer: {
    flex: 1,
  },
});

export default Navigator;
