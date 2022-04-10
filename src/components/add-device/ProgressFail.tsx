import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { FontFamily, FontSize } from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import Button from '../Button';
import Icon from '../icons/Icons';

interface Props {
  errorMessage: string;
  onPress: Function;
  onMountFailPage?: Function;
}

export type ProgressFailProps = Props;
const ProgressFail: FC<ProgressFailProps> = props => {
  useEffect(() => {
    if (props.onMountFailPage != undefined) props.onMountFailPage();
  }, []);

  return (
    <View style={styles.constrainer}>
      <View style={styles.iconConstrainer}>
        <Icon name={'failed'} color={'red'} size={200} />
      </View>
      <View style={styles.errorConstrainer}>
        <Text style={styles.text}>{props.errorMessage}</Text>
      </View>
      <View style={styles.button}>
        <Button
          title="بازگشت"
          color={Colors.danger}
          height={Layout.scaleY(85)}
          onPress={() => props.onPress()}
          isLoading={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constrainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  iconConstrainer: {},
  errorConstrainer: {
    paddingHorizontal: Layout.scaleX(60),
  },
  text: {
    fontFamily: FontFamily.DiodrumArabic.Medium,
    fontSize: FontSize.medium,
    textAlign: 'center',
  },
  button: {
    marginTop: Layout.scaleX(80),
  },
});

export default ProgressFail;
