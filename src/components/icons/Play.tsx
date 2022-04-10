import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type PlayProps = Props;
const Play: React.FC<PlayProps> = (props) => {
  return (
    <Svg viewBox="0 0 36.18 36.18" width={props.size} height={props.size}>
      <G fill="red" data-name="Layer 2">
        <G data-name="Layer 1">
          <Circle
            cx={18.09}
            cy={18.09}
            r={17.84}
            fill={props.color}
            stroke="#fff"
            strokeMiterlimit={10}
            strokeWidth={0}
          />
          <Path fill="#fff" d="M14.92 11.92l9.41 7.13-9.78 6.62.37-13.75z" />
        </G>
      </G>
    </Svg>
  );
};

export default Play;
