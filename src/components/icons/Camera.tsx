import React from 'react';
import Svg, { Circle, G } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type CameraProps = Props;
const Camera: React.FC<CameraProps> = (props) => {
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
          <Circle
            cx={18.09}
            cy={18.09}
            r={9}
            stroke={props.color}
            strokeMiterlimit={10}
            strokeWidth={3}
          />
        </G>
      </G>
    </Svg>
  );
};

export default Camera;
