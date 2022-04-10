import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Button from './Button';

interface Props {
  continue: Function;
}

export type DeviceWifiListProps = Props;

class DeviceWifiList extends React.Component<Props> {
  async openPage() {
    await Linking.openURL('http://172.217.28.1/wifi_config');
  }

  render() {
    return (
      <View>
        <View style={styles.content}>
          <ScrollView style={styles.input}>
            <Text style={styles.text}>
              سه دکمه سمت راست دستگاه را فشار داده و به مدت 5 ثانیه نگه دارید تا دستگاه به حالت
              آماده برود.
            </Text>
            <Text style={styles.text}>پس از آن به وای فای زیر وصل شوید</Text>
            <Text style={styles.text}>نام: emersan_iot3</Text>
            <Text style={styles.text}>رمز عبور: 12345678</Text>
            <Text style={styles.text}>
              سپس دکمه بازکردن مرورگر را زده و از لیست نشان داده به wifi خانگی خود وصل شوید. به
              برنامه بازگشته و ادامه را بزنید.
            </Text>
          </ScrollView>
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              isLoading={false}
              title="بازکردن مرورگر"
              color={Colors.primary}
              height={Layout.scaleY(85)}
              onPress={this.openPage}
            />
          </View>
          <View style={styles.button}>
            <Button
              isLoading={false}
              title="ادامه"
              color={Colors.info}
              height={Layout.scaleY(85)}
              onPress={() => this.props.continue()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    height: Layout.window.height,
    backgroundColor: '#fff',
    flex: 1,
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'space-around' },
  input: { paddingBottom: Layout.scaleY(47) },
  errorLabel: {
    color: Colors.danger,
    fontWeight: 'bold',
    padding: 8,
    fontSize: 13,
    maxWidth: Layout.scaleX(425),
  },
  buttons: {
    height: Layout.scaleY(250),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  button: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 17,
    paddingHorizontal: 20,
  },
});
export default DeviceWifiList;
