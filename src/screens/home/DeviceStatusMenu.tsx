import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SemiCircleMenu from '../../components/SemiCircleMenu';
import Layout from '../../constants/Layout';
import { InjectedMenuStore } from '../../stores';

export type menuProps = InjectedMenuStore;

@inject('menu')
@observer
class DeviceStatusMenu extends Component<menuProps> {
  render() {
    return (
      <View style={styles().buttonMain}>
        <SemiCircleMenu
          buttons={this.props.menu.deviceStatus}
          changeStatus={(index: number) => this.props.menu.changeStatus(index)}
          width={Layout.window.width * 0.7}
          dock="button"
          middleButtonAction={() => this.props.menu.changeDisplayState()}
          middleButtonToggle={this.props.menu.isDisplayOn}
        />
      </View>
    );
  }
}

const styles = () =>
  StyleSheet.create({
    buttonMain: {
      alignItems: 'center',
    },
  });

export default DeviceStatusMenu;
