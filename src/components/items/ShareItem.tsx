import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Icon from '../icons/Icons';

interface Props {
  name: string;
  number: string;
  action: () => any;
}
export type ShareItemProps = Props;
const ShareItem: FC<ShareItemProps> = (props) => {
  return (
    <View style={styles(props).container}>
      <View style={styles(props).action}>
        <TouchableOpacity
          onPress={props.action}
          style={{
            transform: [{ rotateZ: '45deg' }],
            flex: 1,
            justifyContent: 'center',
            height: '100%',
          }}>
          <Icon name={'plus'} color={Colors.danger} />
        </TouchableOpacity>
      </View>
      <View style={styles(props).item}>
        <Text style={styles(props).nameText}>{props.name}</Text>
        <Text style={styles(props).numberText}>{props.number}</Text>
      </View>
    </View>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
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
      fontFamily: FontFamily.DiodrumArabic.Regular,
      fontWeight: 'bold',
    },
    numberText: {
      textAlign: 'right',
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    action: {
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
  });

export default ShareItem;
