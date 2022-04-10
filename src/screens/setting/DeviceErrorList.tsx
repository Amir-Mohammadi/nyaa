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
class DeviceErrorList extends Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <Header title={'نمایش خطا'} action={() => goBack()} />
        <FlatList
          data={this.props.menu.errorShowList}
          renderItem={({ item }) => {
            return (
              <View>
                <SettingItem.Expandable
                  title={item.title}
                  button={{ title: item.buttonText, action: () => item.action() }}
                  explanation={item.subValue}
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

export default DeviceErrorList;
