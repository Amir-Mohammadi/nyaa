import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type OpenDoorProps = Props;
const OpenDoor: React.FC<OpenDoorProps> = (props) => {
  return (
    <Svg viewBox="0 0 33.33 25.71" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill={props.color}
            d="M30.47 22.62l2.86-8.1a3.09 3.09 0 00-2.38-3v-1a3.86 3.86 0 00-3.86-3.86H23a5.75 5.75 0 01-1.62 2.38h1.95v2.38h-4.76v-1a6 6 0 01-.95.08 6.12 6.12 0 01-1-.08v1H11.9V9h1.95a5.79 5.79 0 01-1.61-2.39H6.72a3.86 3.86 0 00-3.86 3.86v.93A3.08 3.08 0 000 14.52l2.38 8.09a3.09 3.09 0 003.09 3.1h21.9a3.09 3.09 0 003.1-3.09zM25.24 9.05h1.85a1.48 1.48 0 011.48 1.48v.9h-3.34zM6.72 9H10v2.39H5.24v-.9A1.48 1.48 0 016.72 9z"
          />
          <Path
            fill={props.color}
            d="M13.26 6.66a3.25 3.25 0 00.28.52 4.49 4.49 0 00.4.57c.09.11.17.23.27.33s.25.22.38.33a3.11 3.11 0 00.28.23 3.91 3.91 0 00.44.26l.24.15a4.94 4.94 0 001.08.38 5.11 5.11 0 001.91 0 5.22 5.22 0 001.09-.38 1.94 1.94 0 00.24-.15 3.91 3.91 0 00.44-.26 3.11 3.11 0 00.28-.23c.13-.11.27-.21.39-.33s.17-.21.26-.32a4.78 4.78 0 00.41-.59 4.91 4.91 0 00.28-.5 4.87 4.87 0 00.4-1.91 4.76 4.76 0 10-9.52 0 4.62 4.62 0 00.45 1.9zm6.27-1.43a.2.2 0 010 .11.25.25 0 01-.06.17L18.27 7v.79a.23.23 0 01-.06.12v.07a.27.27 0 01-.19.08h-1.1a.28.28 0 01-.2-.08.27.27 0 01-.08-.19V7l-1.22-1.49a.27.27 0 01.21-.44h3.66a.26.26 0 01.24.16zm-3.45-1.34a2.18 2.18 0 012.68-.06.26.26 0 01.1.2.24.24 0 01-.08.19.29.29 0 01-.36 0 1.55 1.55 0 00-.96-.22 1.58 1.58 0 00-1 .35.26.26 0 01-.36 0 .27.27 0 01-.1-.27.28.28 0 01.08-.19zm1.38-1.8a3.47 3.47 0 012.24.82.3.3 0 01.1.19.27.27 0 01-.08.19.26.26 0 01-.36 0 2.89 2.89 0 00-3.78.05.27.27 0 01-.37 0 .28.28 0 01-.08-.2.3.3 0 01.1-.2 3.47 3.47 0 012.23-.85z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default OpenDoor;
