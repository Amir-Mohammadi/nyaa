import React from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type FlashProps = Props;
const Flash: React.FC<FlashProps> = (props) => {
  return (
    <Svg viewBox="0 0 17.21 17.21" width={props.size} height={props.size}>
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={2.75}
          y1={8.21}
          x2={11.01}
          y2={8.21}
          gradientUnits="userSpaceOnUse">
          <Stop offset={0} stopColor="#90d5e1" />
          <Stop offset={1} stopColor="#04aa9d" />
        </LinearGradient>
      </Defs>
      <G data-name="Layer 2">
        <G data-name="Layer 1">
          <Circle cx={8.6} cy={8.6} r={8.6} fill="#fff" />
          <Path fill={props.color} d="M2.75 8.21l8.26 7.32V.89L2.75 8.21z" />
        </G>
      </G>
    </Svg>
  );
};

export default Flash;
