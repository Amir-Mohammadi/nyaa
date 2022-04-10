import React, { FC } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../constants/Colors';
import { FontFamily, FontSize } from '../../constants/Fonts';

interface Props {
  title: string;
  action: Function;
  buttonText: string;
}
export type SimpleItemProps = Props;
const SettingMenuItemWithButton: FC<SimpleItemProps> = (props) => {
  return (
    <View style={styles(props).item}>
      <Text style={styles(props).mainText}>{props.title}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          props.action();
        }}>
        <Text style={styles(props).buttonText}>{props.buttonText}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
      flexDirection: 'row',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    mainText: {
      color: Colors.primary,
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    buttonText: {
      color: 'white',
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Medium,
    },
  });

export default SettingMenuItemWithButton;
