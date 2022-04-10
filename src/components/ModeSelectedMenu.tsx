import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { FontSize } from '../constants/Fonts';

interface Props {
  selectedMode: number;
  ChangeState: Function;
}

export type ModeSelectedMenuProps = Props;
const ModeSelectedMenu: FC<ModeSelectedMenuProps> = (props) => {
  var items = ['Off', 'Mp3', 'Radio'];

  return (
    <View style={{ flexDirection: 'row' }}>
      {items.map((item: string, index: number) => {
        return (
          <View key={index + Math.random()} style={styles(props).touchableAreaView}>
            <Pressable
              onPress={() => {
                props.ChangeState(index);
              }}>
              <Text
                style={
                  props.selectedMode == index
                    ? {
                        color: Colors.success,
                        borderBottomColor: Colors.success,
                        borderBottomWidth: 1,
                        paddingHorizontal: 5,
                        fontSize: FontSize.media,
                      }
                    : {
                        paddingVertical: 5,
                        color: '#808080',
                        paddingHorizontal: 5,
                        fontSize: FontSize.media,
                      }
                }>
                {item}
              </Text>
            </Pressable>
            {items.length - index == 1 ? null : <Text style={styles(props).dot}> • </Text>}
          </View>
        );
      })}
    </View>
  );
};
const styles = (props: any) =>
  StyleSheet.create({
    mainView: { flexDirection: 'row' },
    touchableAreaView: { flexDirection: 'row', alignItems: 'center' },
    dot: {
      color: '#808080',
      fontSize: FontSize.media,
    },
  });
export default ModeSelectedMenu;
