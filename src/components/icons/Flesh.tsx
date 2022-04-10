import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type FleshProps = Props;
const Flesh: React.FC<FleshProps> = (props) => {
  return (
    <Svg viewBox="0 0 12.92 25.33" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill="none"
            stroke={props.color}
            stroke-miterlimit="10"
            stroke-width="0.25"
            d="M.09.09l12.74 12.74M.2 25.24l12.52-12.52"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Flesh;
