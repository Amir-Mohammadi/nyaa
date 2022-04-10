import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Alert from '../../components/Alert';
import { FontFamily, FontSize } from '../../constants/Fonts';
import { InjectedSettingStore } from '../../stores';
import { DialogType } from '../../stores/NotificationStore';
import { InjectedNavigationProps } from '../../utils/models';
import { rootNavigation } from '../../utils/RootNavigation';
import Profile from './profile';

export type menuProps = InjectedNavigationProps & InjectedSettingStore;

@inject('setting')
@observer
class DrawerContent extends Component<menuProps> {
  render() {
    return (
      <View style={styles().container}>
        <Alert
          type={DialogType.CONFIRM}
          visible={this.props.setting.alertVisitable}
          BodyText={this.props.setting.alertMessage}
          confirm={async () => {
            await this.props.setting.alertConfirm();
            this.props.navigation.goBack();
          }}
          cancel={() => {
            this.props.setting.alertCancel();
          }}
          loading={this.props.setting.disabled}
        />
        <Profile />
        <View style={styles().navBar}>
          {this.props.state.routes.map((route: any, index: number) => {
            const isFocused = this.props.state.index === index;

            const currentPage = rootNavigation.getCurrentRoute();

            if (route.name == 'Menu' || currentPage == 'Setting') return null;

            return (
              <TouchableOpacity
                key={0}
                onPress={() => {
                  const event = this.props.navigation.emit({
                    target: route.key,
                  });
                  if (!isFocused && !event.defaultPrevented) {
                    this.props.navigation.navigate(route.name);
                    global.stores.setting.initialize();
                  }
                }}>
                <View style={styles().navItem}>
                  <Text style={styles().navText}>{'تنظیمات دستگاه'}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles().exitContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.setting.logoutConfirm();
            }}>
            <View style={styles().exit}>
              <Text style={styles().exitText}>{'خروج از حساب کاربری'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    navItem: {
      justifyContent: 'center',
      paddingRight: 20,
      padding: 10,
    },
    navText: {
      fontSize: 18,
      color: '#707070',
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    exitContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderTopWidth: 1,
      borderTopColor: '#D0D3D4',
      backgroundColor: '#F7F6F6',
    },
    navBar: {
      flex: 1,
    },
    exit: {
      paddingHorizontal: 30,
      width: '100%',
      paddingVertical: 20,
    },
    exitText: {
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Medium,
      textAlign: 'left',
      color: 'red',
    },
  });

export default DrawerContent as any;
