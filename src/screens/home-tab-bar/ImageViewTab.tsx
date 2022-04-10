import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { View } from 'react-native';
import ImageView from '../../components/ImageView';
import { InjectedMenuStore } from '../../stores';

export type menuProps = InjectedMenuStore;
@inject('menu')
@observer
export default class ImageViewTab extends Component<menuProps> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageView images={this.props.menu.imageList} />
      </View>
    );
  }
}
