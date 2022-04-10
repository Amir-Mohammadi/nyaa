import NetInfo from '@react-native-community/netinfo';
import React, { Component } from 'react';
import { Animated, Easing, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';
import { FontFamily } from '../constants/Fonts';
import { ConnectionState, Prophet } from '../utils/mqtt/Prophet';

let NetworkBarDisable: boolean = false;
let MqttStatusBarDisable: boolean = false;

export const setNetworkBarDisable = (status: boolean) => {
  NetworkBarDisable = status;
};

export const setMqttStatusBarDisable = (status: boolean) => {
  MqttStatusBarDisable = status;
};

class NoNetworkBar extends Component {
  animationConstants = {
    DURATION: 800,
    TO_VALUE: 4,
    INPUT_RANGE: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    OUTPUT_RANGE: [0, -15, 0, 15, 0, -15, 0, 15, 0],
  };

  state = {
    isConnected: true,
    isMqttConnected: true,
    isMqttConnecting: true,
  };
  animation: Animated.Value;
  mqtt: Prophet = Prophet.getInstance();

  constructor(props: any) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    NetInfo.addEventListener(state => {
      const { isConnected } = state;
      this.setNetworkStatus(isConnected);
    });

    this.mqtt.onStatus().subscribe(status => {
      console.log('mqtt status is ', status);

      const isMqttConnected =
        status.status != ConnectionState.Failed && status.status != ConnectionState.Disconnected;

      const isMqttConnecting =
        status.status == ConnectionState.Connecting ||
        status.status == ConnectionState.Reconnecting;

      this.setState({
        isMqttConnected,
        isMqttConnecting,
      });
    });
  }

  setNetworkStatus = (status: boolean) => {
    this.setState({ isConnected: status });
    if (status) {
      this.triggerAnimation();
    }
  };

  triggerAnimation = () => {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      duration: this.animationConstants.DURATION,
      toValue: this.animationConstants.TO_VALUE,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  render() {
    const interpolated = this.animation.interpolate({
      inputRange: this.animationConstants.INPUT_RANGE,
      outputRange: this.animationConstants.OUTPUT_RANGE,
    });

    const animationStyle = {
      transform: [{ translateX: interpolated }],
    };

    const { isConnected, isMqttConnected, isMqttConnecting } = this.state;

    if (!isConnected && !NetworkBarDisable) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={Colors.danger} />
          <Animated.Text style={[styles.offlineText, animationStyle]}>
            {'دستگاه به اینترنت متصل نمی باشد'}
          </Animated.Text>
        </SafeAreaView>
      );
    }

    if (isMqttConnecting && !MqttStatusBarDisable) {
      return (
        <SafeAreaView style={{ backgroundColor: Colors.primary }}>
          <StatusBar backgroundColor={Colors.primary} />
          <Text style={styles.offlineText}>{'در حال تلاش برای اتصال به سرور...'}</Text>
        </SafeAreaView>
      );
    }

    if (!isMqttConnected && !MqttStatusBarDisable) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={Colors.danger} />
          <Animated.Text style={[styles.offlineText, animationStyle]}>
            {'ارتباط با سرور برقرار نمی‌باشد'}
          </Animated.Text>
        </SafeAreaView>
      );
    }

    return <StatusBar backgroundColor={Colors.primary} />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.danger,
  },
  offlineText: {
    color: '#fff',
    padding: 0,
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 12,
    fontFamily: FontFamily.DiodrumArabic.SemiBold,
  },
});

export default NoNetworkBar;
