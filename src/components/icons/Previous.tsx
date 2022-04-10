import React from 'react';
import Svg, { Circle, Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type PreviousProps = Props;
const Previous: React.FC<PreviousProps> = (props) => {
  return (
    <Svg viewBox="0 0 138.96 138.96" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Circle fill={props.color} cx={69.48} cy={69.48} r={69.48} />
          <Path
            fill="#fff"
            d="M89.93 89.76L66.24 76.08a4.42 4.42 0 010-7.65l23.69-13.67a4.41 4.41 0 016.63 3.82v27.35a4.42 4.42 0 01-6.63 3.83zM56.5 89.76L32.81 76.08a4.42 4.42 0 010-7.65L56.5 54.76a4.41 4.41 0 016.63 3.82v27.35a4.42 4.42 0 01-6.63 3.83z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Previous;
