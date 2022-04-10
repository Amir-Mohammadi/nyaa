import React, { FC, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icons from './icons/Icons';
interface Props {
  color: string;
  placeholder: string;
  height: number;
  selectedIndex: number | null;
  items: any[string];
}
export type DropdownMenuProps = Props;
const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const [showItems, setShowItems] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);
  const [animation, setAnimation] = useState(new Animated.Value(50));
  function toggle() {
    let initialValue = showItems
      ? props.items.length * 60 > 600
        ? 600
        : props.items.length * 60
      : props.height;
    let finalValue = showItems
      ? props.height
      : props.items.length * 60 > 600
      ? 600
      : props.items.length * 60;

    setShowItems(!showItems);
    animation.setValue(initialValue);
    Animated.spring(animation, {
      toValue: finalValue,
      useNativeDriver: false,
    }).start();
  }
  return (
    <TouchableOpacity
      disabled={showItems}
      onPress={() => {
        toggle();
      }}>
      <Animated.View
        style={[
          {
            borderWidth: 1,
            borderRadius: props.height / 2,
            borderColor: props.color,
            width: props.height * 5.46,
            height: showItems ? props.items.length * 60 : props.height,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          },
          { height: animation },
        ]}>
        {showItems ? null : <Icons name="drawer" size={30} color={props.color} />}
        {showItems ? (
          <View style={{ flex: 1, padding: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {props.items.map((item: string, index: number) => {
                return (
                  <TouchableOpacity
                    key={index + 'asdjjiodsa'}
                    onPress={() => {
                      setSelectedIndex(index);
                      toggle();
                    }}>
                    <View
                      style={{
                        padding: 20,
                        width: '90%',
                        ...(props.items.length - index == 1 ? null : { borderBottomWidth: 0.5 }),
                        alignSelf: 'center',
                        borderColor: '#dbd9d9',
                      }}>
                      <Text>{item}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <Text style={{ color: '#999999' }}>
            {selectedIndex == null ? props.placeholder : props.items[selectedIndex]}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DropdownMenu;
