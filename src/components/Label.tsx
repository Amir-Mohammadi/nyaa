import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  value: string;
  color: string;
  fontsize: number;
}
export type LabelProps = Props;
const Label: FC<LabelProps> = (props) => {
  return <Text style={styles(props).mainText}>{props.value}</Text>;
};
const styles = (props: any) =>
  StyleSheet.create({
    mainText: {
      color: props.color,
      fontSize: props.fontsize,
    },
  });
export default Label;
