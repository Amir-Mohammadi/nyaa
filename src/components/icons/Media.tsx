import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type MediaProps = Props;
const Media: React.FC<MediaProps> = (props) => {
  return (
    <Svg viewBox="0 0 36.18 36.18" width={props.size} height={props.size}>
      <G data-name="Layer 2">
        <G data-name="Layer 1">
          <Circle
            cx={18.09}
            cy={18.09}
            r={17.84}
            fill="none"
            stroke={props.color}
            strokeMiterlimit={10}
            strokeWidth={0.5}
          />
          <Path fill={props.color} d="M14.79 12.74l9.56 6.56-9.65 6.44.09-13z" />
        </G>
      </G>
    </Svg>
  );
};

export default Media;
