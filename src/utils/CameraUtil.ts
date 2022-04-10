import { encode as btoa } from 'base-64';

class CameraUtil {
  static TransferToFile(mqttMessage: Buffer): string {
    let binary = '';
    let bytes = new Uint8Array(mqttMessage);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}

export default CameraUtil;
