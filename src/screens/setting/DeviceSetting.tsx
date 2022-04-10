import { inject, observer } from 'mobx-react';
import { View } from 'native-base';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import SettingItem from '../../components/setting-menu-items';
import { InjectedAuthStore, InjectedMenuStore, InjectedSettingStore } from '../../stores';
import { goBack, navigate } from '../../utils/RootNavigation';

export type Props = InjectedSettingStore & InjectedAuthStore & InjectedMenuStore;

@inject('setting')
@inject('auth')
@inject('menu')
@observer
export default class DeviceSettingScreen extends Component<Props> {
  componentDidMount() {
    this.props.setting.initialize();
  }

  render() {
    return (
      <SafeAreaView>
        <Header
          title={'تنظیمات دستگاه'}
          action={() => goBack()}
          secondButton={{
            icon: 'remove',
            action: () => {
              this.props.setting.deleteDevice();
            },
          }}
        />
        <ScrollView>
          <View>
            <SettingItem.Navigation title={'پروفایل'} onPress={() => navigate('DeviceProfile')} />
          </View>
          <View>
            <SettingItem.Navigation
              title={'نمایش خطا'}
              onPress={() => navigate('DeviceErrorList')}
            />
          </View>
          <View>
            <SettingItem.Navigation
              title={'اشتراک گذاری'}
              onPress={() => navigate('SharedDevices')}
              disable={!this.props.setting.shareDeviceAvailable}
            />
          </View>
          <View>
            <SettingItem.Navigation
              title={'پیکره‌بندی مجدد'}
              onPress={() => {
                global.stores.dialog.askConfirm(
                  'برای پیکره بندی مجدد دستگاه شما باید مراحل اضافه کردن آن دستگاه را از ابتدا انجام دهید',
                  async () => navigate('AddDevice'),
                );
              }}
              disable={!this.props.setting.shareDeviceAvailable}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
