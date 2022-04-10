import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Layout from '../constants/Layout';

export type Props = {
  message: string;
};

class OverlayMessage extends Component<Props> {
  render() {
    if (this.props.message && this.props.message != '') {
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              width: '90%',
              color: 'white',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: Layout.scaleX(40),
            }}>
            {this.props.message}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }
}
export default OverlayMessage;
