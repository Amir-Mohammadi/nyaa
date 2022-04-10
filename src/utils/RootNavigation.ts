import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (name: string, params?: Object) => {
  navigationRef.current?.navigate(name, params);
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const rootNavigation = {
  navigate: (name: string, params?: Object) => {
    navigationRef.current?.navigate(name, params);
  },

  getCurrentRoute: () => {
    return navigationRef.current?.getCurrentRoute()?.name;
  },

  goBack: () => {
    navigationRef.current?.goBack();
  },
};
