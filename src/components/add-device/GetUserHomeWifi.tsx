import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import Colors from '../../constants/Colors';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import { getCurrentWifi, WiFi } from '../../utils/GetCurrentSSID';
import Button from '../Button';
import Icon from '../icons/Icons';
import Input from '../Input';

interface Props {
  passwordInputErrorMessage?: string;
  onMountSelectingUserWifiPage?: Function;
  onPressConfirmButton: (wifi: WiFi, password: string) => void;
  isButtonLoading?: boolean;
}

let wifiChangeListenerId = uuid.v4();

export type SelectingUserWifiProps = Props;
const SelectingUserWifi: FC<SelectingUserWifiProps> = props => {
  const [currentWiFi, setCurrentWiFi] = useState<WiFi | null>(null);
  const [currentWiFiPassword, setCurrentWiFiPassword] = useState('');

  useEffect(() => {
    if (props.onMountSelectingUserWifiPage != undefined) props.onMountSelectingUserWifiPage();
  }, []);

  useEffect(() => {
    updateCurrentSSID();

    global.services.netInfoService.listen(wifiChangeListenerId, async () => {
      await updateCurrentSSID();
    });

    return () => {
      global.services.netInfoService.clear(wifiChangeListenerId);
    };
  }, []);

  const updateCurrentSSID = async () => {
    let wifi = await getCurrentWifi();
    setCurrentWiFi(wifi);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.explain}>
            {
              'ابتدا اطمینان حاصل کنید دستگاه در حالت قفل باشد (دکمه قفل فعال باشد) و تلفن همراه شما به VPN متصل نباشد'
            }
          </Text>
          <Text style={styles.explain}>
            {'دستگاه را با نگه داشتن دکمه WI-FI به مدت 3 ثانیه، به حالت کانفیگ ببرید'}
          </Text>
          <Text style={styles.explain}>
            {
              ' مودم و تلفن همراه خود را نزدیک به دستگاه کنید. سپس از تنظیمات گوشی موبایل به شبکه WiFi ای که می خواهید دستگاه شما به آن متصل شود، متصل شوید'
            }
          </Text>
          <Text style={styles.explain}>
            {
              'پس از انجام مراحل بالا، رمز شبکه WiFi انتخاب شده را وارد برنامه کنید و دکمه ادامه را بزنید'
            }
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputs}>
            <Input
              color={currentWiFi == null ? Colors.warnings : Colors.info}
              placeholder="به شبکه WiFi متصل شوید"
              height={Layout.scaleY(100)}
              value={currentWiFi?.ssid ?? ''}
              secureTextEntry={false}
              inputmode={'default'}
              disable={true}
              onChange={() => {}}
            />
            <TouchableHighlight
              style={styles.refreshIcon}
              onPress={() => {
                updateCurrentSSID();
              }}>
              <Icon name={'refresh'} size={20} color={Colors.info} />
            </TouchableHighlight>
          </View>
          <View style={styles.inputPass}>
            <Input
              color={props.passwordInputErrorMessage ? Colors.danger : Colors.success}
              placeholder="WI-FI رمز شبکه"
              height={Layout.scaleY(100)}
              onChange={(value: string) => setCurrentWiFiPassword(value)}
              value={currentWiFiPassword}
              secureTextEntry={false}
              autoCapitalize="none"
              inputmode="visible-password"
            />
            {props.passwordInputErrorMessage ? (
              <Text style={styles.errorLabel}>• {props.passwordInputErrorMessage}</Text>
            ) : undefined}
          </View>
          <View style={styles.button}>
            <Button
              title="ادامه"
              color={currentWiFi == null ? Colors.disable : Colors.success}
              height={Layout.scaleY(85)}
              onPress={() => {
                if (currentWiFi == null) return;
                props.onPressConfirmButton(currentWiFi, currentWiFiPassword);
              }}
              isLoading={props.isButtonLoading}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputs: {
    paddingBottom: Layout.scaleY(40),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputPass: {
    paddingBottom: Layout.scaleY(40),
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: Layout.scaleY(80),
  },
  errorLabel: {
    color: Colors.danger,
    fontWeight: 'bold',
    padding: 8,
    fontSize: 13,
    maxWidth: Layout.scaleX(425),
  },
  refreshIcon: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginLeft: 5,
    borderRadius: 30,
  },
  button: {
    paddingHorizontal: Layout.scaleY(20),
    alignSelf: 'center',
  },
  explain: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.DiodrumArabic.Regular,
    textAlign: 'center',
  },
  textContainer: {
    padding: Layout.scaleX(60),
    marginTop: Layout.scaleY(40),
    marginBottom: Layout.scaleY(60),
  },
});

export default SelectingUserWifi;
