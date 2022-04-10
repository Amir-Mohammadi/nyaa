import React from 'react';
import { View } from 'react-native';
import Colors from '../constants/Colors';
import Logo from './Logo';

const LoadingScreen: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Logo size="md" color={Colors.primary} />
      {/* <ActivityIndicator size="large" color={Colors.primary} /> */}
    </View>
  );
};

export default LoadingScreen;
