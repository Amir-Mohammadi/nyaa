import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../constants/Colors';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';

interface Props {
  title: string;
  explanation: string;
  button: {
    title: string;
    action: () => any;
  };
}
export type SimpleItemProps = Props;
const SettingExpandableItem: FC<SimpleItemProps> = (props) => {
  const [expanded, toggleExpanded] = useState(false);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => toggleExpanded(!expanded)}>
        <View style={styles(props).item}>
          <Text style={styles(props).mainText}>{props.title}</Text>
        </View>
      </TouchableWithoutFeedback>

      {expanded && props.explanation != '' ? (
        <View style={styles(props).subItem}>
          <View>
            <Text style={styles(props).infoText}>{props.explanation}</Text>
          </View>
          <TouchableOpacity onPress={props.button.action}>
            <View style={styles(props).subButton}>
              <Text style={styles(props).buttonText}>{props.button.title}</Text>
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
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderColor: '#999999',
      paddingHorizontal: Layout.scaleX(50),
      paddingVertical: Layout.scaleY(40),
    },
    mainText: {
      fontSize: FontSize.medium,
      fontFamily: FontFamily.DiodrumArabic.Regular,
      color: props.color,
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

export default SettingExpandableItem;
