import React from 'react';
import { ScrollView, Text as ReactText, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import { FontFamily, FontSize } from '../constants/Fonts';
import Layout from '../constants/Layout';
import { default as Icon, default as Icons } from './icons/Icons';

interface Props {
  height: number;
  items: { name: string }[];
  selectedIndex: number;
  addItems: { text: string; action: Function };
  setIndex: Function;
  openSideMenuAction: Function;
}

export type SideMenuProps = Props;
class SideMenu extends React.Component<SideMenuProps> {
  calculateTheWidthOfContenets = () => {
    if (this.props.items.length == 1) {
      return ((this.props.height * 0.9) / 3) * 2 - this.props.height * 0.02;
    } else return undefined;
  };

  render() {
    var svgHeight = 589.88;
    var svgWidth = 174.17;
    var width = (this.props.height * svgWidth) / svgHeight;
    var height = this.props.height;
    var selectedIndex =
      this.props.selectedIndex >= this.props.items.length ? 0 : this.props.selectedIndex ?? 0;

    const initialize = () => {
      return (
        <>
          <View style={{ alignSelf: 'baseline' }}>
            <Svg viewBox="0 0 174.17 589.88" width={width} height={height}>
              <Defs>
                <LinearGradient
                  id="prefix__linear-gradient"
                  y1={svgHeight / 2}
                  x2={svgWidth}
                  y2={svgHeight / 2}
                  gradientUnits="userSpaceOnUse">
                  <Stop offset={0} stopColor="#90d5e1" />
                  <Stop offset={1} stopColor="#04aa9d" />
                </LinearGradient>
              </Defs>
              <G id="prefix__Layer_2" data-name="Layer 2">
                <Path
                  d="M174.17 0h-21.95a62.92 62.92 0 00-62.73 62.73v79c-5.43 21.86-16.32 48.23-45 69.64C18.83 230.5 0 259.1 0 293.46v2.96c0 34.36 18.83 63 44.47 82.08 28.7 21.41 39.59 47.78 45 69.64v79a62.92 62.92 0 0062.73 62.73h21.95z"
                  fill="url(#prefix__linear-gradient)"
                  id="prefix__Layer_1-2"
                  data-name="Layer 1"
                />
              </G>
            </Svg>

            <TouchableOpacity
              style={{
                borderWidth: 0,
                borderRadius: this.props.height / 15,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: width * 0.03,
                marginTop: this.props.height / 2 - this.props.height / 30,
                position: 'absolute',
              }}
              onPress={() => {
                this.props.addItems.action();
              }}>
              <View>
                <Icons name="plus" color="#00a99d" size={this.props.height / 15} />
              </View>
            </TouchableOpacity>
            <ReactText
              style={{
                borderWidth: 0,
                width: this.props.height * 0.26,
                height: this.props.height * 0.055,
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                fontSize: FontSize.small,
                fontFamily: FontFamily.DiodrumArabic.Medium,
                marginLeft: width * 0.37 - (this.props.height * 0.26) / 2,
                marginTop: height / 2 - (this.props.height * 0.055) / 2,
                position: 'absolute',
                transform: [{ rotate: '-90deg' }],
                color: '#fff',
              }}
              numberOfLines={1}>
              {this.props.addItems.text}
            </ReactText>
          </View>
        </>
      );
    };

    const withDetail = () => {
      return (
        <>
          <View style={{ alignSelf: 'baseline' }}>
            <Svg viewBox="0 0 174.17 589.88" width={width} height={height}>
              <Defs>
                <LinearGradient
                  id="prefix__linear-gradient"
                  y1={svgHeight / 2}
                  x2={svgWidth}
                  y2={svgHeight / 2}
                  gradientUnits="userSpaceOnUse">
                  <Stop offset={0} stopColor="#90d5e1" />
                  <Stop offset={1} stopColor="#04aa9d" />
                </LinearGradient>
              </Defs>
              <G id="prefix__Layer_2" data-name="Layer 2">
                <Path
                  d="M174.17 0h-21.95a62.92 62.92 0 00-62.73 62.73v79c-5.43 21.86-16.32 48.23-45 69.64C18.83 230.5 0 259.1 0 293.46v2.96c0 34.36 18.83 63 44.47 82.08 28.7 21.41 39.59 47.78 45 69.64v79a62.92 62.92 0 0062.73 62.73h21.95z"
                  fill="url(#prefix__linear-gradient)"
                  id="prefix__Layer_1-2"
                  data-name="Layer 1"
                />
              </G>
            </Svg>
            <TouchableOpacity
              onPress={() => {
                this.props.openSideMenuAction();
              }}
              style={{
                zIndex: 100,
                borderWidth: 0,
                alignItems: 'stretch',
                justifyContent: 'center',
                width: width / 2,
                marginLeft: width * 0.03,
                marginTop:
                  this.props.height / 2 -
                  this.props.height / 30 -
                  this.props.height / 5 +
                  this.props.height / 7.5,
                position: 'absolute',
                height: this.props.height / 5,
              }}>
              <Icons name="flash" color="#00a99d" size={this.props.height / 15} />
            </TouchableOpacity>
            <ReactText
              style={{
                borderWidth: 0,
                width: this.props.height * 0.26,
                height: this.props.height * 0.055,
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                fontSize: FontSize.small,
                fontFamily: FontFamily.DiodrumArabic.Medium,
                marginLeft: width * 0.37 - (this.props.height * 0.26) / 2,
                marginTop: height / 2 - (this.props.height * 0.055) / 2,
                position: 'absolute',
                transform: [{ rotate: '-90deg' }],
                color: '#fff',
              }}
              numberOfLines={1}>
              {this.props.items[selectedIndex].name}
            </ReactText>

            <View
              style={{
                height: (this.props.height * svgWidth) / svgHeight / 3.5,
                width: this.props.height * 0.9,
                transform: [{ rotate: '-90deg' }],
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                marginLeft: -this.props.height * 0.21,
                marginTop: height / 2 - (this.props.height * svgWidth) / svgHeight / 6,
              }}>
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: (this.props.height * 0.9) / 3,
                  height: (this.props.height * svgWidth) / svgHeight / 4,
                  borderRadius: (this.props.height * svgWidth) / svgHeight / 4 / 3,
                  flexDirection: 'row',
                  margin: this.props.height * 0.01,
                }}
                onPress={() => {
                  this.props.addItems.action();
                }}>
                <View style={{ paddingLeft: Layout.scaleY(589) * 0.025 }}>
                  <Icon name="plus" color="white" size={this.props.height * 0.045} />
                </View>
                <View
                  style={{
                    width: (this.props.height * 0.9) / 3 - this.props.height * 0.045 - 20,
                  }}>
                  <ReactText
                    numberOfLines={1}
                    style={{
                      fontSize: FontSize.small,
                      fontFamily: FontFamily.DiodrumArabic.Medium,
                      color: '#fff',
                    }}>
                    {this.props.addItems.text}
                  </ReactText>
                </View>
              </TouchableOpacity>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {this.props.items.map((item: { name: string }, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        borderWidth: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: this.props.height * 0.02,
                        width: this.calculateTheWidthOfContenets(),
                        height: (this.props.height * svgWidth) / svgHeight / 4,
                        backgroundColor: index == selectedIndex ? '#fff' : undefined,
                        borderRadius: (this.props.height * svgWidth) / svgHeight / 4 / 3,
                      }}
                      key={index + Math.random()}
                      onPress={() => {
                        this.props.setIndex(index);
                      }}>
                      <ReactText
                        numberOfLines={1}
                        style={{
                          fontSize: FontSize.small,
                          fontFamily: FontFamily.DiodrumArabic.Medium,
                          marginHorizontal: this.props.height * 0.02,
                          color: index == selectedIndex ? '#00a99d' : '#fff',
                        }}>
                        {item.name}
                      </ReactText>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </>
      );
    };

    if (this.props.items.length == 0) {
      return initialize();
    } else {
      return withDetail();
    }
  }
}
export default SideMenu;
