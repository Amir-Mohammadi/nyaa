import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { BackHandler, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectingUserWifi from '../../components/add-device/GetUserHomeWifi';
import ProcessingPage from '../../components/add-device/Progress';
import ProgressFail from '../../components/add-device/ProgressFail';
import FinalizingDeviceTransfer from '../../components/add-device/ValidateTransfer';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { setMqttStatusBarDisable } from '../../components/InternetStatus';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { InjectedAddDeviceStore } from '../../stores';
import Logger from '../../utils/Logger';

export enum AddDeviceSteps {
  // GetUserWifiInfo,
  // FindDeviceProgress,
  // SelectDevice,
  // ConfigDeviceInternetProgress,
  // VerifyTransfer,
  // -----------------------------
  SelectingUserWifi = 1,
  ConfiguringDevice = 2,
  FinalizingTransfer = 3,
  FailedPage = 4,
}

const logger = new Logger('AddDevicePage');

interface State {
  permissionModal: boolean;
}

export type AddDeviceScreenProps = InjectedAddDeviceStore;

@inject('addDevice')
@observer
export default class AddDeviceScreen extends Component<AddDeviceScreenProps, State> {
  constructor(props: AddDeviceScreenProps) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = { permissionModal: true };
  }

  componentDidMount() {
    logger.info('add device page mounted');
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // setNetworkBarDisable(true);
    setMqttStatusBarDisable(true);
    // setSuppressedApiToast(true);
  }

  componentWillUnmount() {
    logger.info('add device page will unmount');
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.props.addDevice.resetStore();
    global.stores.menu.reloadMenuStore();
    // setNetworkBarDisable(false);
    setMqttStatusBarDisable(false);
    // setSuppressedApiToast(false);
  }

  handleBackButton() {
    logger.trace('handleBackButton');
    this.props.addDevice.goBack();
    return true;
  }

  renderSwitch = (step: AddDeviceSteps) => {
    switch (step) {
      case AddDeviceSteps.SelectingUserWifi: {
        return (
          <SelectingUserWifi
            onMountSelectingUserWifiPage={() => this.props.addDevice.onMountSelectingUserWifiPage()} // done
            isButtonLoading={this.props.addDevice.isSelectUserWifiButtonLoading} // done
            onPressConfirmButton={(ssid, password) => {
              this.props.addDevice.onPressSelectUserWifiButton(ssid, password); // done
            }}
          />
        );
      }
      case AddDeviceSteps.ConfiguringDevice: {
        return (
          <ProcessingPage
            isRetryButtonDisable={false}
            retryButtonOnClick={() => this.props.addDevice.onMountDeviceConfigPage()}
            onMountProcessingPage={() => this.props.addDevice.onMountDeviceConfigPage()} // done
            cancelButtonOnClick={() => {
              this.props.addDevice.cancelDeviceConfigProcess();
            }}
            processItems={this.props.addDevice.configDeviceProgressPageItems}
            title={'اتصال دستگاه به اینترنت'}
            countdown={this.props.addDevice.countdownValue}
          />
        );
      }
      case AddDeviceSteps.FinalizingTransfer: {
        return (
          <FinalizingDeviceTransfer
            deviceName={this.props.addDevice.deviceName}
            onMountFinalizingDevicePage={() => {
              this.props.addDevice.onMountFinalizingTransferPage(); // done
            }}
            onClickReturnHomeButton={async () => {
              this.props.addDevice.returnToMenuPage();
            }}
            isLoading={this.props.addDevice.finalizingTransferPageIsLoading}
          />
        );
      }
      case AddDeviceSteps.FailedPage: {
        return (
          <ProgressFail
            onMountFailPage={() => this.props.addDevice.onMountFailPage()} // done
            errorMessage={this.props.addDevice.failPageMessage}
            onPress={() => {
              this.props.addDevice.goBack();
            }}
          />
        );
      }
    }
  };

  renderPermissionDialog() {
    return (
      <Modal
        visible={!this.props.addDevice.locationPermissionStatus}
        animationType={'slide'}
        onRequestClose={() => {
          this.handleBackButton();
          this.setState({ permissionModal: false });
        }}>
        <View style={styles.permissionMessage}>
          <Text style={{ color: '#fff', fontSize: 18 }}>
            برای ادامه عملیات به دسترسی شما نیازمندیم.
          </Text>
          <TouchableOpacity onPress={() => this.props.addDevice.getLocationPermission()}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: '#fff',
                margin: 20,
              }}>
              <Text>دسترسی</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <>
        {this.renderPermissionDialog()}
        <View style={styles.main}>
          <View style={styles.background}>
            <Background height={Layout.scaleY(697.3181)} />
          </View>
          <View>
            <Header title="افزودن دستگاه" action={this.handleBackButton} />
          </View>
          <View style={styles.content}>
            {this.renderSwitch(this.props.addDevice.addDeviceCurrentPage)}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    height: Layout.window.height,
    backgroundColor: '#fff',
    flex: 1,
  },
  background: { position: 'absolute', zIndex: 0, top: Layout.scaleY(350) },
  content: { flex: 1, alignItems: 'center', justifyContent: 'space-around' },
  permissionMessage: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
