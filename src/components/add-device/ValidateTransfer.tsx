import React, { FC, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import Button from '../Button';

interface Props {
  onClickReturnHomeButton: Function;
  onMountFinalizingDevicePage?: Function;
  isLoading: boolean;
  deviceName: string;
}

export type FinalizingDeviceTransferProps = Props;
const FinalizingDeviceTransfer: FC<FinalizingDeviceTransferProps> = props => {
  useEffect(() => {
    if (props.onMountFinalizingDevicePage != undefined) props.onMountFinalizingDevicePage();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.constrainer}>
        <View style={styles.textContainer}>
          <Text style={styles.explain}>
            {'اطلاعات شبکه WiFi  شما با موفقیت به دستگاه ارسال شد' +
              ' ' +
              `و دستگاه با نام  "${props.deviceName}" به لیست دستگاه های شما اضافه شد`}
          </Text>
          <Text style={styles.explain}>
            {
              'اگر بعد از 2 دقیقه چراغ WiFi بر روی دستگاه از حالت چشمک زن به حالت ثابت تغییر نکرد، برسی کنید که رمز عبور شبکه WiFi را درست وارد کرده اید و دستگاه امکان دسترسی به اینترنت را از طریق WiFi دارد.'
            }
          </Text>
        </View>

        <View style={styles.button}>
          <Button
            title="بازگشت به صفحه اصلی"
            color={Colors.success}
            height={Layout.scaleY(85)}
            onPress={() => {
              props.onClickReturnHomeButton();
            }}
            isLoading={props.isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  constrainer: {
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: Layout.scaleY(20),
    alignSelf: 'center',
    margin: Layout.scaleY(100),
  },
  explain: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.DiodrumArabic.Regular,
    lineHeight: Layout.scaleY(50),
    textAlign: 'center',
    padding: Layout.scaleX(20),
  },
  textContainer: {
    padding: Layout.scaleX(60),
    marginTop: Layout.scaleY(80),
  },
});

export default FinalizingDeviceTransfer;
