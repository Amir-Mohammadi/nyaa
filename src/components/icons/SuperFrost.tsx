import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type SuperFrostProps = Props;
const SuperFrost: React.FC<SuperFrostProps> = (props) => {
  return (
    <Svg viewBox="0 0 22.15 32.16" width={props.size} height={props.size}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix__Layer_1-2" data-name="Layer 1">
          <Path
            fill={props.color}
            d="M14.57 17a7.69 7.69 0 00-2.76.52V4a4 4 0 00-4-4h-2.1a4 4 0 00-4 4v16.2a6.76 6.76 0 005.05 11.24h.1a6.72 6.72 0 003.14-.83A7.57 7.57 0 1014.57 17zm0 13.12a5.55 5.55 0 115.55-5.55 5.54 5.54 0 01-5.54 5.56zM3.71 4a2 2 0 012-2h2.07a2 2 0 012 2v14.7a7.5 7.5 0 00-2 2.55V4.83a1 1 0 00-2 0L5.75 23a2 2 0 001 3.74 2.18 2.18 0 00.52-.06 7.58 7.58 0 001.21 2.45 4.64 4.64 0 01-1.66.34 4.74 4.74 0 01-3.41-8.1 1 1 0 00.3-.72V4z"
          />
          <Path
            fill={props.color}
            d="M18.45 26l-.34-.18a.58.58 0 00-.36-1l-1.45.06-.43-.24.43-.23h1.45a.57.57 0 00.57-.55.54.54 0 00-.23-.48l.34-.19a.57.57 0 00.23-.78.58.58 0 00-.78-.23l-.34.19a.57.57 0 00-1.06-.26l-.74 1.24-.52.28V23l.78-1.21a.58.58 0 00-.21-.79.55.55 0 00-.53 0v-.39a.58.58 0 00-1.15 0V21a.56.56 0 00-.53 0 .57.57 0 00-.2.78L14.1 23v.58l-.52-.28-.74-1.24a.57.57 0 00-.79-.19.56.56 0 00-.28.45l-.34-.18a.57.57 0 00-.77.23.57.57 0 00.23.78l.34.18a.57.57 0 00.34 1h1.45l.43.23-.43.24-1.45-.05a.56.56 0 00-.59.55.55.55 0 00.23.48l-.34.19a.56.56 0 00-.23.77.57.57 0 00.51.3.54.54 0 00.27-.07l.34-.18a.61.61 0 00.27.46.67.67 0 00.3.08.58.58 0 00.49-.28l.74-1.24.52-.28v.58l-.74 1.25a.57.57 0 00.2.78.61.61 0 00.54 0v.38a.58.58 0 101.15 0v-.38a.58.58 0 00.53 0 .57.57 0 00.2-.78l-.74-1.25v-.58l.52.27.74 1.24a.58.58 0 00.49.28.54.54 0 00.3-.08.59.59 0 00.28-.46l.33.19a.72.72 0 00.28.07.57.57 0 00.5-.3.57.57 0 00-.21-.74z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default SuperFrost;
