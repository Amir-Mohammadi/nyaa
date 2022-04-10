import React from 'react';
import Svg, { Circle, Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type NextProps = Props;
const Next: React.FC<NextProps> = (props) => {
  return (
    <Svg viewBox="0 0 138.96 138.96" width={props.size} height={props.size}>
      <Defs></Defs>
      <G>
        <G>
          <Circle fill={props.color} cx={69.48} cy={69.48} r={69.48} />
          <Path
            fill="#fff"
            d="M50.4 48.23l23.69 13.68a4.41 4.41 0 010 7.65L50.4 83.24a4.42 4.42 0 01-6.62-3.83V52.06a4.42 4.42 0 016.62-3.83zM83.89 48.23l23.69 13.68a4.41 4.41 0 010 7.65L83.89 83.24a4.42 4.42 0 01-6.62-3.83V52.06a4.42 4.42 0 016.62-3.83z"
          />
        </G>
      </G>
    </Svg>
  );
};
export default Next;
