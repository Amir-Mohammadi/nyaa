import { inject, observer } from 'mobx-react';
import { View } from 'native-base';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import SettingItem from '../../components/setting-menu-items';
import { InjectedAuthStore, InjectedMenuStore, InjectedSettingStore } from '../../stores';
import { goBack } from '../../utils/RootNavigation';

export type Props = InjectedSettingStore & InjectedAuthStore & InjectedMenuStore;

@inject('setting')
@inject('auth')
@inject('menu')
@observer
export default class DeviceProfile extends Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <Header title={'پروفایل'} action={() => goBack()} />
        <ScrollView>
          <View>
            <SettingItem.WithInfo title={'نام دستگاه'} info={this.props.setting.deviceName} />
          </View>
          <View>
            <SettingItem.WithInfo title={'نوع دستگاه'} info={this.props.setting.deviceType} />
          </View>
          <View>
            <SettingItem.WithInfo
              title={'ورژن دستگاه'}
              info={this.props.setting.device!.type.version}
            />
          </View>
          <View>
            <SettingItem.Item
              title={'ویرایش نام دستگاه'}
              action={() => {
                this.props.setting.changeDeviceName();
              }}
              disabled={!this.props.setting.shareDeviceAvailable}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
