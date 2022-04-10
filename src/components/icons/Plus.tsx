import React from 'react';
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type PlusProps = Props;
const Plus: React.FC<PlusProps> = (props) => {
  return (
    <Svg viewBox="0 0 17.21 17.21" width={props.size} height={props.size}>
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={3.86}
          y1={8.93}
          x2={13.14}
          y2={8.93}
          gradientUnits="userSpaceOnUse">
          <Stop offset={0} stopColor="#90d5e1" />
          <Stop offset={1} stopColor="#04aa9d" />
        </LinearGradient>
      </Defs>
      <G data-name="Layer 2">
        <G data-name="Layer 1">
          <Path
            d="M13.14 10.06H9.77v3.57H7.26v-3.57h-3.4V7.69h3.4V4.22h2.51v3.47h3.37z"
            fill={props.color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default Plus;
