import { StackNavigationProp } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import ProfileScreen from '../../components/profile';
import { InjectedProfileStore } from '../../stores';

type RootStackParamList = {
  Setting: undefined;
  Login: undefined;
  Menu: undefined;
};

export type SettingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Setting'>;

export type Props = {
  navigation: SettingScreenNavigationProp;
} & InjectedProfileStore;

@inject('profile')
@observer
class Profile extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.profile.setProfileInfo();
  }

  render() {
    return (
      <ProfileScreen
        avatarPlaceholder={this.props.profile.avatar_placeholder}
        avatarUrl={this.props.profile.avatar_url}
        family={this.props.profile.family}
        idCode={this.props.profile.id_code}
        name={this.props.profile.name}
        phone={this.props.profile.phone}
      />
    );
  }
}

export default Profile as any;
