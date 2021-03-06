import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type FridgeProps = Props;
const Fridge: React.FC<FridgeProps> = (props) => {
  return (
    <Svg viewBox="0 0 36.17 36.17" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            d="M18.09.25A17.84 17.84 0 11.25 18.09 17.83 17.83 0 0118.09.25m0-.25a18.09 18.09 0 1018.08 18.09A18.1 18.1 0 0018.09 0z"
            fill={props.color}
          />
          <Path
            d="M33.44 17.69h-4.06l1.1-1.69L29 15l-1.72 2.68h-4.87a4.52 4.52 0 00-.62-1.48l3.43-3.42 3.11.67.38-1.75-2-.43 2.86-2.87-1.24-1.25L25.46 10 25 8l-1.75.38.75 3.14L20.53 15a4.52 4.52 0 00-1.48-.62V9.49l2.68-1.72-1-1.51-1.71 1.1V3.3h-1.76v4.06l-1.7-1.1-1 1.51 2.67 1.72v4.84a4.28 4.28 0 00-1.75.82l-3.12-3.57.88-3.06L11.55 8 11 10 8.32 6.92 7 8.09l2.67 3.06-2 .29.26 1.78 3.07-.46 3.29 3.77a4.59 4.59 0 00-.42 1.16h-4.8L7.34 15l-1.5 1 1.1 1.71H2.88v1.79h4.06l-1.1 1.7 1.5 1 1.73-2.67h4.84a4.24 4.24 0 00.61 1.47l-3.42 3.38L8 23.7l-.37 1.75 2 .43-2.91 2.87L8 30l2.87-2.87.43 2 1.7-.37-.68-3.12 3.43-3.42a4.24 4.24 0 001.47.61v4.84l-2.63 1.73 1 1.5 1.7-1.1v4.06h1.79V29.8l1.71 1.1 1-1.5-2.68-1.73v-4.84a4.29 4.29 0 001.48-.61L24 25.64l-.67 3.12 1.75.37.43-2L28.33 30l1.26-1.27-2.86-2.87 2-.43-.38-1.75-3.11.68L21.79 21a4.46 4.46 0 00.62-1.47h4.84L29 22.15l1.51-1-1.1-1.7h4.06zm-15.28 3.44a2.55 2.55 0 112.55-2.55 2.55 2.55 0 01-2.55 2.55z"
            fill={props.color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default Fridge;
