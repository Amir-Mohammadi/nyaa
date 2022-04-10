import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type LockProps = Props;
const Lock: React.FC<LockProps> = (props) => {
  return (
    <Svg viewBox="0 0 17.23 24.59" width={props.size} height={props.size}>
      <G data-name="Layer 2">
        <Path
          d="M15.35 9.81h-.62v-3.9A5.93 5.93 0 008.78 0h-.43a5.94 5.94 0 00-5.91 6v3.84h-.61A1.83 1.83 0 000 11.69v11.06a1.85 1.85 0 001.85 1.84h13.51a1.86 1.86 0 001.84-1.85V11.68a1.84 1.84 0 00-1.85-1.87zM4.9 5.94a3.47 3.47 0 013.46-3.48h.43a3.47 3.47 0 013.48 3.46v3.9H4.9zm9.87 16.15H2.49v-9.83h12.28z"
          fill={props.color}
          data-name="Layer 1"
        />
      </G>
    </Svg>
  );
};

export default Lock;
