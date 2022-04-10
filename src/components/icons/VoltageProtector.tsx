import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type VoltageProtectorProps = Props;
const VoltageProtector: React.FC<VoltageProtectorProps> = (props) => {
  return (
    <Svg viewBox="0 0 23.49 20.82" width={props.size} height={props.size}>
      <G data-name="Layer 2">
        <Path
          d="M15.26 17.3a1.18 1.18 0 01-2.35 0v-6.14h10.57C23.5 5 18.25 0 11.77 0S0 5 0 11.14h10.57v6.13a3.53 3.53 0 007 0v-.55h-2.31zm-6.19-6.94l2-4.34H8.74l2.69-4.35h3.35L11.76 5h2.68z"
          fill={props.color}
          data-name="Layer 1"
        />
      </G>
    </Svg>
  );
};

export default VoltageProtector;
