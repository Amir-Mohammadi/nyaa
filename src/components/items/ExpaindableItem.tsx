import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../constants/Colors';
import { FontFamily, FontSize } from '../../constants/Fonts';

interface Props {
  value: string;
  subvalue: string;
  buttonText: string;
  action: () => any;
}
export type SimpleItemProps = Props;
const ExpaindableItem: FC<SimpleItemProps> = (props) => {
  const [expaind, setExpaind] = useState(false);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setExpaind(!expaind)}>
        <View style={styles(props).item}>
          <Text style={styles(props).mainText}>{props.value}</Text>
        </View>
      </TouchableWithoutFeedback>

      {expaind && props.subvalue != '' ? (
        <View style={styles(props).subItem}>
          <View>
            <Text style={styles(props).infoText}>{props.subvalue}</Text>
          </View>
          <TouchableOpacity onPress={props.action}>
            <View style={styles(props).subButton}>
              <Text style={styles(props).buttonText}>{props.buttonText}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
    },
    mainText: {
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
      color: props.color,
      paddingHorizontal: 50,
      paddingVertical: 18,
    },
    subItem: {
      backgroundColor: '#F1F2F2',
      flexDirection: 'row',
      paddingHorizontal: 50,
      paddingVertical: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
    },
    infoText: {
      color: 'black',
      fontSize: FontSize.small,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    buttonText: {
      padding: 5,
      color: '#fff',
      fontSize: FontSize.small,
      fontFamily: FontFamily.DiodrumArabic.Regular,
    },
    subButton: { backgroundColor: Colors.success, borderRadius: 5 },
  });

export default ExpaindableItem;
