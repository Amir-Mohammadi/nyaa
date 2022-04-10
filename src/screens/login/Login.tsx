import { inject, observer } from 'mobx-react';
import React from 'react';
import { setMqttStatusBarDisable } from '../../components/InternetStatus';
import Login from '../../components/Login';
import { InjectedAuthStore } from '../../stores';
import { InjectedNavigationProps } from '../../utils/models';

export type LoginScreenProps = InjectedAuthStore & InjectedNavigationProps;

@inject('auth')
@observer
export default class LoginScreen extends React.Component<LoginScreenProps> {
  componentDidMount() {
    setMqttStatusBarDisable(true);
  }

  componentWillUnmount() {
    setMqttStatusBarDisable(false);
  }

  render() {
    return (
      <Login
        isSeasonChecked={this.props.auth.isSeasonChecked}
        step={this.props.auth.step}
        updatePhoneNumber={(text: string) => this.props.auth.updatePhoneNumber(text)}
        updateVerifyCode={(text: string) => this.props.auth.updateVerifyCode(text)}
        updateIdCode={(text: string) => this.props.auth.updateIdCode(text)}
        updateFirstName={(text: string) => this.props.auth.updateFirstName(text)}
        updateLastName={(text: string) => this.props.auth.updateLastName(text)}
        errorMessage={this.props.auth.errorMessage}
        phoneNumber={this.props.auth.phoneNumber}
        verifyCode={this.props.auth.verifyCode}
        idCode={this.props.auth.idCode}
        firstName={this.props.auth.firstName}
        lastName={this.props.auth.lastName}
        disabled={this.props.auth.disabled}
        errorFirstNameMessage={this.props.auth.errorFirstNameMessage}
        errorLastNameMessage={this.props.auth.errorLastNameMessage}
        validate={() => this.props.auth.validate()}
        setStep={() => this.props.auth.setStep()}
        emptyErrors={() => this.props.auth.emptyErrors()}
      />
    );
  }
}
