import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

var width: number;
var height: number;

export type VolumeDownProps = Props;
const VolumeDown: React.FC<VolumeDownProps> = (props) => {
  return (
    <Svg viewBox="0 0 76.02 76.02" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill={props.color}
            d="M43.63 9.39a3.88 3.88 0 00-4 0 1.12 1.12 0 00-.22.16L22.69 25.2a1.43 1.43 0 01-.61.14H11.53a3.94 3.94 0 00-3.93 3.93v16.21a3.94 3.94 0 003.93 3.93h10.55a1.43 1.43 0 01.61.14l16.77 15.62a1.53 1.53 0 00.22.16A3.93 3.93 0 0045.61 62V12.8a3.9 3.9 0 00-1.98-3.41zM43.08 62a1.37 1.37 0 01-.71 1.21 1.41 1.41 0 01-1.3.05L24.29 47.58a1.12 1.12 0 00-.22-.16 3.86 3.86 0 00-2-.54H11.53a1.4 1.4 0 01-1.39-1.4V29.27a1.4 1.4 0 011.39-1.4h10.55a3.86 3.86 0 002-.54.92.92 0 00.22-.17l16.77-15.62a1.41 1.41 0 011.3.05 1.37 1.37 0 01.71 1.21z"
          />
          <Path
            fill={props.color}
            d="M38 0a38 38 0 1038 38A38.05 38.05 0 0038 0zm0 73.48A35.48 35.48 0 1173.48 38 35.52 35.52 0 0138 73.48z"
          />
          <Path
            fill={props.color}
            d="M70.44 39.47H49.93a1.47 1.47 0 110-2.93h20.51a1.47 1.47 0 110 2.93z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default VolumeDown;
