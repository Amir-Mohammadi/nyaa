import { inject, observer } from 'mobx-react';
import { View } from 'native-base';
import React, { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
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
class SharedDevices extends Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <Header
          title={'اشتراک گذاری'}
          action={() => goBack()}
          secondButton={{
            action: () => {
              this.props.setting.shareDevice();
            },
            icon: 'plus',
          }}
        />
        <FlatList
          data={this.props.setting.shareList}
          renderItem={({ item }) => {
            return (
              <View>
                <SettingItem.WithIcon
                  title={item.title}
                  icon={{ action: () => item.action() }}
                  info={item.number}
                />
              </View>
            );
          }}
          keyExtractor={(_, index) => String(index)}
        />
      </SafeAreaView>
    );
  }
}

export default SharedDevices;
