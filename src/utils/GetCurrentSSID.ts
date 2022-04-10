import WiFiManager from 'react-native-wifi-reborn';
import { enableLocationIfNeeded } from './EnableLocationIfNeeded';
import Logger from './Logger';

const logger = new Logger('WiFiUtil');

interface IWiFi {
  ssid: string;
  bssid: string;
  ip: string;
  frequency: number;
  signalStrength: number;
}

export class WiFi implements IWiFi {
  ssid: string;
  bssid: string;
  ip: string;
  frequency: number;
  signalStrength: number;

  constructor(ssid: string) {
    this.ssid = ssid;
  }
}

export async function getCurrentWifi(): Promise<WiFi | null> {
  try {
    await enableLocationIfNeeded();

    var currentSSID = await WiFiManager.getCurrentWifiSSID();
    const wifi = new WiFi(currentSSID);

    wifi.bssid = await WiFiManager.getBSSID();
    wifi.frequency = await WiFiManager.getFrequency();
    wifi.signalStrength = await WiFiManager.getCurrentSignalStrength();
    wifi.ip = await WiFiManager.getIP();

    logger.debug(`loading current ssid, current ssid is ${currentSSID}`);
    return wifi;
  } catch (e) {
    logger.error('getting current ssid failed', e);
    return null;
  }
}
