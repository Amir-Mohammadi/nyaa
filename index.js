/**
 * @format
 */

import { AppRegistry, I18nManager } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App.tsx';

I18nManager.allowRTL(false);

AppRegistry.registerComponent(appName, () => App);
