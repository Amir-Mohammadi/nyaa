import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import AppIntroSliderLibrary from 'react-native-app-intro-slider';
import EngineerSvg from '../../components/intro-slier-svg/engineer';
import OnlineSvg from '../../components/intro-slier-svg/online';
import TeamSvg from '../../components/intro-slier-svg/team';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import { AsyncStoreKeys } from '../../utils/models';

const slides = [
  {
    key: 'one',
    text: 'یخچالت رو از راه دور کنترل کن!',
    image: () => <OnlineSvg size={Layout.scaleX(400)} />,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    text: 'از مشکلات یخچالت قبل از خراب شدن اون با خبر شو!',
    image: () => <EngineerSvg size={Layout.scaleX(400)} />,
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    text: 'اجازه کنترل یخچال خونه رو به اعضای خانواده بده!',
    image: () => <TeamSvg size={Layout.scaleX(400)} style={{ marginBottom: Layout.scaleY(100) }} />,
    backgroundColor: '#22bcb5',
  },
];

type Item = typeof slides[0];

export default class AppIntroSlider extends Component {
  _renderItem = ({ item }: { item: Item }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.backgroundColor,
          },
        ]}
      >
        {item.image()}
        <Text style={styles.title}>{item.text}</Text>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>بعدی</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>تمام</Text>
      </View>
    );
  };

  _renderSkipButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>رد شدن</Text>
      </View>
    );
  };

  private _onDone = () => {
    AsyncStorage.setItem(AsyncStoreKeys.IS_INTRO_WATCHED, 'true');
    global.stores.auth.isIntroWatched = true;
  };

  _keyExtractor = (item: Item) => item.key;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSliderLibrary
          keyExtractor={this._keyExtractor}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          showSkipButton
          renderSkipButton={this._renderSkipButton}
          onSkip={this._onDone}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.big,
    color: 'white',
    textAlign: 'center',
    fontFamily: FontFamily.DiodrumArabic.Regular,
    flexShrink: 1,
  },
  buttonContainer: {
    marginHorizontal: Layout.scaleX(60),
  },
  button: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.DiodrumArabic.Medium,
    color: 'white',
  },
});
