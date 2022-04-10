import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type TempratureUpProps = Props;
const TempratureUp: React.FC<TempratureUpProps> = (props) => {
  return (
    <Svg viewBox="0 0 43.23 64.44" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill={props.color}
            d="M29.87 37a13.25 13.25 0 00-5.66 1.26v-30A8.25 8.25 0 0016 0h-4.26a8.26 8.26 0 00-8.25 8.25v33.14a13.86 13.86 0 0010.36 23h.2a13.69 13.69 0 008.36-3 13.21 13.21 0 007.46 2.29 13.36 13.36 0 100-26.71zM7.64 8.25a4.11 4.11 0 014.1-4.1H16a4.11 4.11 0 014.1 4.1v33.09a13.3 13.3 0 00-3.28 6.36 4.15 4.15 0 00-.87-.68V9.89a2.07 2.07 0 00-4.14 0V47a4.12 4.12 0 105.08 6.39 13.45 13.45 0 002.46 5.17 9.68 9.68 0 01-15.17-8A9.67 9.67 0 017 43.69a2.09 2.09 0 00.62-1.47v-34zm13 42.14a9.21 9.21 0 119.21 9.21 9.22 9.22 0 01-9.19-9.21z"
          />
          <Path
            fill={props.color}
            d="M34.53 49h-3.27v-3.26a1.39 1.39 0 00-2.77 0V49h-3.27a1.39 1.39 0 000 2.77h3.27v3.27a1.39 1.39 0 002.77 0v-3.26h3.27a1.39 1.39 0 000-2.77z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default TempratureUp;
