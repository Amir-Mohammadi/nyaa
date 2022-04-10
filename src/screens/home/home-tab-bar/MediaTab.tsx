import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Background from '../../../components/Background';
import MediaController from '../../../components/MediaController';
import ModeSelectedMenu from '../../../components/ModeSelectedMenu';
import VolumeController from '../../../components/VolumeController';
import Layout from '../../../constants/Layout';
import { InjectedMenuStore } from '../../../stores';

export type menuProps = InjectedMenuStore;

@inject('menu')
@observer
class MediaTab extends Component<menuProps> {
  state = {
    mode: 0,
  };

  render() {
    return (
      <View style={styles().Media}>
        <View style={{ position: 'absolute', zIndex: 0 }}>
          <Background height={Layout.scaleY(697.3181)} />
        </View>
        <View>
          <ModeSelectedMenu
            selectedMode={this.props.menu.selectedMediaMode}
            ChangeState={(mode: number) => this.props.menu.changeMediaMode(mode)}
          />
        </View>
        <View style={styles().middleMedia}>
          <MediaController
            scan={() => {
              this.props.menu.scan();
            }}
            height={Layout.scaleY(350)}
            previous={() => {
              this.props.menu.previous();
            }}
            next={() => {
              this.props.menu.next();
            }}
            play={() => {
              this.props.menu.play();
            }}
            color="#00a99d"
            mode={this.props.menu.selectedMediaMode}
          />
        </View>
        <View style={styles().middleVolume}>
          <VolumeController
            height={Layout.scaleY(195)}
            volumeDown={() => {
              this.props.menu.volumeDown();
            }}
            volumeUp={() => {
              this.props.menu.volumeUp();
            }}
            mode={this.props.menu.selectedMediaMode}
          />
        </View>
      </View>
    );
  }
}

const styles = () =>
  StyleSheet.create({
    Media: {
      alignItems: 'center',
      // paddingLeft: Layout.scaleX(25),
    },
    middleMedia: {
      // paddingBottom: Layout.scaleY(10),
      paddingTop: Layout.scaleY(60),
    },
    middleVolume: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default MediaTab;
