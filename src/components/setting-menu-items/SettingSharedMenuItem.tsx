import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Icon from '../icons/Icons';

interface Props {
  title: string;
  info: string;
  icon: {
    action: () => any;
  };
}
export type ShareItemProps = Props;
const SettingSharedMenuItem: FC<ShareItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <TouchableOpacity
          onPress={props.icon.action}
          style={{
            transform: [{ rotateZ: '45deg' }],
            flex: 1,
            justifyContent: 'center',
            height: '100%',
          }}>
          <Icon name={'plus'} color={Colors.danger} />
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text style={styles.nameText}>{props.title}</Text>
        <Text style={styles.numberText}>{props.info}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    paddingVertical: 10,
  },
  item: {
    flex: 1,
    paddingHorizontal: 20,
  },
  nameText: {
    color: '#707070',
    fontSize: FontSize.medium,
    fontFamily: FontFamily.DiodrumArabic.SemiBold,
    textAlign: 'right',
  },
  numberText: {
    textAlign: 'right',
    fontSize: FontSize.medium,
    fontFamily: FontFamily.DiodrumArabic.Light,
  },
  action: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default SettingSharedMenuItem;
