import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type ECOProps = Props;
const ECO: React.FC<ECOProps> = (props) => {
  return (
    <Svg viewBox="0 0 54.5 54.5" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill="none"
            stroke={props.color}
            strokeWidth={3}
            d="M35.71 53.3L.9 27.04M35.71 1.2L.9 27.46"
          />
        </G>
      </G>
    </Svg>
  );
};

export default ECO;
