import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type TempratureDownProps = Props;
const TempratureDown: React.FC<TempratureDownProps> = (props) => {
  return (
    <Svg viewBox="0 0 43.25 64.48" width={props.size} height={props.size} {...props}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill={props.color}
            d="M29.89 37.06a13.25 13.25 0 00-5.66 1.26V8.25A8.26 8.26 0 0016 0h-4.26a8.26 8.26 0 00-8.25 8.25v33.17a13.86 13.86 0 0010.37 23.06h.2a13.75 13.75 0 008.36-3 13.36 13.36 0 107.47-24.44zM7.64 8.25a4.11 4.11 0 014.1-4.1H16a4.11 4.11 0 014.1 4.1v33.11a13.35 13.35 0 00-3.28 6.36 4.38 4.38 0 00-.87-.67V9.9a2.07 2.07 0 10-4.14 0v37.15a4.12 4.12 0 105.08 6.39 13.25 13.25 0 002.47 5.17A9.7 9.7 0 017 43.72a2.06 2.06 0 00.62-1.48v-34zm13 42.17a9.22 9.22 0 119.21 9.22 9.22 9.22 0 01-9.17-9.22z"
          />
          <Path
            fill={props.color}
            d="M34.55 49h-9.32a1.39 1.39 0 000 2.77h9.32a1.39 1.39 0 000-2.77z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default TempratureDown;
