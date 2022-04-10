import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type HambergerProps = Props;
const Hamberger: React.FC<HambergerProps> = (props) => {
  return (
    <Svg viewBox="0 0 53.68 33.14" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill="none"
            stroke={props.color}
            strokeWidth={4}
            d="M1.5 1.5h50.68M1.5 21.6h50.68M1.5 11.55h50.68M1.5 31.64h50.68"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Hamberger;
