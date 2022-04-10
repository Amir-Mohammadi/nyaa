import React, { FC, useEffect, useState } from 'react';
import { Dimensions, Keyboard, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { FontSize } from '../constants/Fonts';
import Layout from '../constants/Layout';
import Background from './Background';
import Button from './Button';
import Input from './Input';
import LoadingScreen from './LoadingScreen';
import Logo from './Logo';
interface Props {
  phoneNumber?: string;
  verifyCode?: string;
  idCode?: string;
  firstName?: string;
  lastName?: string;
  errorMessage?: string;
  errorFirstNameMessage?: string;
  errorLastNameMessage?: string;
  validate: any;
  updatePhoneNumber: any;
  updateVerifyCode: any;
  updateIdCode: any;
  updateFirstName: any;
  updateLastName: any;
  setStep?: any;
  step: number;
  emptyErrors: any;
  isSeasonChecked: boolean;
  disabled: boolean;
}

export type InputProps = Props;
const Login: FC<InputProps> = props => {
  const [keyboardMode, setKeyboardMode] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardMode(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardMode(false);
  };

  const signupForm = [
    [
      {
        type: 'phoneNumber',
        placeholder: 'شماره موبایل',
        error: props.errorMessage,
        value: props.phoneNumber,
        onChange: props.updatePhoneNumber,
        inputmode: 'phone-pad',
        buttonTitle: 'تایید شماره موبایل',
      },
    ],
    [
      {
        type: 'verifyPhoneNumber',
        placeholder: 'Verify Code',
        error: props.errorMessage,
        value: props.verifyCode,
        onChange: props.updateVerifyCode,
        inputmode: 'numeric',
        buttonTitle: 'ادامه',
      },
    ],
    [
      {
        type: 'signUp',
        placeholder: 'کد ملی',
        error: props.errorMessage,
        value: props.idCode,
        onChange: props.updateIdCode,
        inputmode: 'number-pad',
        buttonTitle: 'ادامه',
      },
      {
        type: 'signUp',
        placeholder: 'نام',
        error: props.errorFirstNameMessage,
        value: props.firstName,
        onChange: props.updateFirstName,
        inputmode: undefined,
        buttonTitle: 'ادامه',
      },
      {
        type: 'signUp',
        placeholder: 'نام خانوادگی',
        error: props.errorLastNameMessage,
        value: props.lastName,
        onChange: props.updateLastName,
        inputmode: undefined,
        buttonTitle: 'ادامه',
      },
    ],
  ];

  const renderLogin = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          height: Dimensions.get('window').height - (StatusBar.currentHeight ?? 0),
        }}
        scrollEnabled={keyboardMode}>
        <View style={styles.main}>
          <View style={styles.background}>
            <Background height={Layout.scaleY(697.3181)} />
          </View>
          <View style={styles.header}>
            <Logo size="md" color={'black'} />
          </View>
          <View style={styles.content}>
            {signupForm[props.step].map((input: any, index: number) => (
              <View key={index} style={styles.input}>
                <Input
                  color={input.error ? Colors.danger : Colors.success}
                  placeholder={input.placeholder}
                  height={Layout.scaleY(100)}
                  onChange={input.onChange}
                  value={input.value}
                  secureTextEntry={input.secureTextEntry}
                  inputmode={input.inputmode}
                />
                {input.error ? <Text style={styles.errorLabel}>• {input.error}</Text> : undefined}
              </View>
            ))}
            {props.step ? null : <Text style={styles.phoneTamplate}>09xx-xxx-xxxx</Text>}
            {props.step == 1 ? (
              <Text style={styles.phoneTamplate}>کد تایید ارسال شده را وارد کنید.</Text>
            ) : null}
          </View>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                title={signupForm[props.step][0].buttonTitle}
                color={Colors.success}
                height={Layout.scaleY(85)}
                onPress={() => {
                  props.validate();
                }}
                isLoading={props.disabled}
              />
            </View>

            {props.step ? (
              <View style={styles.button}>
                <Button
                  title={'ویرایش شماره'}
                  color={Colors.danger}
                  height={Layout.scaleY(85)}
                  onPress={() => {
                    props.setStep();
                    props.emptyErrors();
                  }}
                  isLoading={false}
                />
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderLoading = () => {
    return <LoadingScreen />;
  };

  return renderLogin();
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: Layout.window.height,
    // height: Dimensions.get('screen').height,
    flex: 1,
    backgroundColor: '#fff',
  },
  background: { position: 'absolute', zIndex: 0, top: Layout.scaleY(350) },
  header: {
    // height: Layout.scaleY(305),
    marginTop: Layout.scaleY(140),
    justifyContent: 'flex-end',
  },
  content: { paddingBottom: Layout.scaleY(0) },
  input: { paddingBottom: Layout.scaleY(47) },
  errorLabel: {
    color: Colors.danger,
    fontWeight: 'bold',
    padding: 8,
    fontSize: 13,
    maxWidth: Layout.scaleX(425),
  },
  buttons: { flexDirection: 'row', marginBottom: Layout.scaleY(100) },
  button: {
    marginHorizontal: Layout.scaleX(30),
  },
  editBtn: {
    color: Colors.danger,
    paddingHorizontal: 40,
    marginRight: -45,
    marginLeft: 20,
    paddingTop: 5,
  },
  phoneTamplate: {
    textAlign: 'center',
    fontSize: FontSize.small,
    color: '#87868c',
  },
});

export default Login;
