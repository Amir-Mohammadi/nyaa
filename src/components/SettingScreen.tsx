import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { FontFamily, FontSize } from '../constants/Fonts';
import Layout from '../constants/Layout';
import Button from './Button';
import Header from './Header';
import Input from './Input';
import SettingList, { SharedDeviceItem } from './SettingList';

interface Props {
  headerAction: Function;
  forceMobxRender: boolean;
  list: Error[];
  logoutButton: Function;
  updateDeviceName: Function;
  deviceName: string;
  deviceCode: number;
  versionCode: string;
  deviceType: string;
  showAlert: boolean;
  alertMessage: string;
  alertConfirm: Function;
  alertCancel: Function;
  phoneNumber: string;
  onPhoneNumberChange: Function;
  code: string;
  onCodeChange: Function;
  showModal: Function;
  cancelAction: Function;
  submitAction: Function;
  disabled: boolean;
  modalVisible: boolean;
  step: number;
  errorMessage: string;
  removeAction: Function;
  shareList: SharedDeviceItem[];
  shareDeviceAvailable: boolean;
}

class SettingScreen extends Component<Props> {
  child: React.RefObject<SettingList>;
  state: { headerTitle: string; headerIcon: string };

  constructor(props: Props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      headerTitle: 'تنظیمات',
      headerIcon: 'remove',
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          visible={this.props.modalVisible}
          transparent={true}
          onRequestClose={() => this.props.cancelAction()}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ paddingVertical: 20 }}>
                <Text style={styles.messageLabel}>شماره موبایل مورد نظر را وارد نمائید</Text>
                <Input
                  color={this.props.errorMessage ? Colors.danger : Colors.success}
                  placeholder="شماره موبایل"
                  value={this.props.phoneNumber}
                  onChange={(value: string) => {
                    this.props.onPhoneNumberChange(value);
                  }}
                  height={Layout.scaleY(93)}
                  inputmode="phone-pad"
                />
                {this.props.errorMessage ? (
                  <Text style={styles.errorLabel}>• {this.props.errorMessage}</Text>
                ) : undefined}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '85%',
                  paddingVertical: 20,
                  justifyContent: 'space-between',
                }}>
                <Button
                  title="تایید"
                  color={Colors.success}
                  onPress={() => {
                    this.props.submitAction();
                  }}
                  height={Layout.scaleY(65)}
                  isLoading={this.props.disabled}
                />
                <Button
                  title="بازگشت"
                  color={Colors.danger}
                  onPress={() => {
                    this.props.cancelAction();
                  }}
                  height={Layout.scaleY(65)}
                  isLoading={false}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Header
          title={this.state.headerTitle}
          action={() => {
            this.child.current!.backButtonAction();
          }}
          secondButton={{
            action:
              this.state.headerIcon == 'remove' ? this.props.removeAction : this.props.showModal,
            icon: this.state.headerIcon,
          }}
        />
        <View>
          <SettingList
            ref={this.child}
            list={this.props.list}
            backButtonAction={() => this.props.headerAction()}
            headerOnChange={(title: string, icon: string, cb: Function = () => {}) => {
              cb(this.state.headerTitle);
              this.setState({ headerTitle: title, headerIcon: icon });
            }}
            shareList={this.props.shareList}
            deviceName={this.props.deviceName}
            deviceCode={this.props.deviceCode}
            deviceType={this.props.deviceType}
            versionCode={this.props.versionCode}
            updateDeviceName={(text: string) => this.props.updateDeviceName(text)}
            shareDeviceAvailable={this.props.shareDeviceAvailable}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exitContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#D0D3D4',
    backgroundColor: '#F7F6F6',
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
  messageLabel: {
    fontFamily: FontFamily.DiodrumArabic.Medium,
    color: '#d3d3d3',
    paddingBottom: 10,
  },
  errorLabel: {
    color: Colors.danger,
    fontWeight: 'bold',
    padding: 8,
    fontSize: 13,
    maxWidth: Layout.scaleX(425),
  },
});

export default SettingScreen;
