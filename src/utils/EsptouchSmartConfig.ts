import { NativeModules } from 'react-native';

type EsptouchSmartConfigType = {
  /**
   * start smart config process with 60 second default timeout
   * @param options currently connected WiFi information
   */

  start(options: EsptouchSmartConfigOptions): Promise<EsptouchSmartConfigResult[]>;

  /**
   * interrupt the smart config process
   */
  stop(): void;
};

export interface EsptouchSmartConfigResult {
  BSSID: string;
  IPv4: string;
}

interface EsptouchSmartConfigOptions {
  SSID: string;
  BSSID: string;
  password: string;
}

const EsptouchSmartConfig = NativeModules.EsptouchSmartConfig;
export default EsptouchSmartConfig as EsptouchSmartConfigType;
