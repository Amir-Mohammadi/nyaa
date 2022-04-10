import React from 'react';
import Svg, { Circle, Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type DrawerProps = Props;
const Drawer: React.FC<DrawerProps> = (props) => {
  return (
    <Svg viewBox="0 0 33.94 33.94" width={props.size} height={props.size}>
      <Defs></Defs>
      <G>
        <G>
          <Circle
            fill="none"
            stroke={props.color}
            strokeWidth={1}
            strokeMiterlimit={10}
            cx={16.97}
            cy={16.97}
            r={16.47}
          />
          <Path
            fill="none"
            stroke={props.color}
            strokeWidth={1}
            strokeMiterlimit={10}
            d="M6.5 11.52l10.33 10.33 10.85-10.33"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Drawer;
