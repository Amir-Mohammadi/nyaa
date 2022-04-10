import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type PowerProps = Props;
const Power: React.FC<PowerProps> = (props) => {
  return (
    <Svg viewBox="0 0 57.34 62.12" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill={props.color}
            d="M28.67 33.45a4.83 4.83 0 004.77-4.79V4.77A4.59 4.59 0 0032 1.41a4.7 4.7 0 00-6.72 0 4.58 4.58 0 00-1.41 3.36v23.9a4.85 4.85 0 004.78 4.77z"
          />
          <Path
            fill={props.color}
            d="M54.32 20.61a28.17 28.17 0 00-8.47-10.07 4.68 4.68 0 00-3.55-.93 4.43 4.43 0 00-3.13 1.87 4.57 4.57 0 00-.91 3.52 4.69 4.69 0 001.85 3.16 19 19 0 015.67 6.75 18.75 18.75 0 012 8.5 18.47 18.47 0 01-1.5 7.42A19.14 19.14 0 0142.2 47a19.34 19.34 0 01-6.1 4 18.94 18.94 0 01-14.82 0 18.89 18.89 0 01-10.2-10.18 18.58 18.58 0 01-1.52-7.41 18.94 18.94 0 017.63-15.21A4.67 4.67 0 0019 15a4.56 4.56 0 00-.91-3.53A4.43 4.43 0 0015 9.65a4.73 4.73 0 00-3.57.94A28.41 28.41 0 000 33.48a27.89 27.89 0 002.29 11.13 28.39 28.39 0 0015.29 15.24 28.28 28.28 0 0022.25 0 28.37 28.37 0 0015.25-15.31 28.59 28.59 0 00-.76-23.93z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Power;
