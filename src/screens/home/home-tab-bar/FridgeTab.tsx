import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TemperatureSlider from '../../../components/temperature-slider';
import Layout from '../../../constants/Layout';
import { InjectedMenuStore } from '../../../stores';

export type menuProps = InjectedMenuStore;

@inject('menu')
@observer
class FridgeTab extends Component<menuProps> {
  render() {
    return (
      <View style={styles().middleTemperature}>
        {/* <View style={{ position: 'absolute', zIndex: 0 }}>
          <Background height={Layout.scaleY(697.3181)} />
        </View> */}
        <TemperatureSlider
          animation={this.props.menu.animateFridgeTemperature}
          height={Layout.scaleY(270)}
          range={[this.props.menu.fridgeRange.start, this.props.menu.fridgeRange.end]}
          value={this.props.menu.fridgeTemperatureValue}
          color="#00a99d"
          action={() => {}}
          increase={() => this.props.menu.fidgeTemperatureIncrease()}
          decrease={() => this.props.menu.fidgeTemperatureDecrease()}
        />
      </View>
    );
  }
}

const styles = () =>
  StyleSheet.create({
    middleTemperature: {
      marginBottom: Layout.scaleY(200),
      height: Layout.scaleY(388),
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingHorizontal: Layout.scaleX(80),
    },
  });

export default FridgeTab;
