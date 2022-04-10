import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SideMenuComponent from '../../components/SideMenu';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { InjectedMenuStore } from '../../stores';
import { InjectedNavigationProps } from '../../utils/models';

export type Props = InjectedMenuStore & InjectedNavigationProps;

@inject('menu')
@observer
class SideMenu extends Component<Props> {
  state = {
    overlayToggle: false,
  };

  render() {
    return (
      <>
        {this.state.overlayToggle ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 99,
            }}>
            <TouchableWithoutFeedback
              style={{ width: '100%', height: '100%' }}
              onPress={() =>
                this.setState({
                  overlayToggle: false,
                })
              }
            />
          </View>
        ) : null}

        {this.props.menu.noDevice ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: Colors.success,
              zIndex: 99,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(0,0,0,0.1)',
              }}>
              <Text style={{ color: '#fff', fontSize: 18 }}>دستگاهی برای نمایش وجود ندارد</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AddDevice');
                }}>
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
                  <Text>افزودن دستگاه جدید</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={this.state.overlayToggle ? styles().sideMenuShow : styles().sideMenuHide}>
            <SideMenuComponent
              height={Layout.scaleY(589)}
              items={this.props.menu.listOfDevices}
              selectedIndex={this.props.menu.selectedDevice}
              addItems={{
                text: 'اضافه کردن دستگاه',
                action: () => {
                  this.props.navigation.navigate('AddDevice');
                },
              }}
              openSideMenuAction={() => {
                this.setState({
                  overlayToggle: !this.state.overlayToggle,
                });
              }}
              setIndex={(index: number) => this.props.menu.setSelectedDevice(index)}
            />
          </View>
        )}
      </>
    );
  }
}

const styles = () =>
  StyleSheet.create({
    sideMenuHide: {
      marginTop: Layout.scaleY(20),
      right: Layout.scaleX(-80),
      position: 'absolute',
      zIndex: 99,
      flex: 1,
    },
    sideMenuShow: {
      marginTop: Layout.scaleY(20),
      right: Layout.scaleX(0),
      position: 'absolute',
      zIndex: 99,
      flex: 1,
    },
  });

export default SideMenu as any;
