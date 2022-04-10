import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type MuteProps = Props;
const Mute: React.FC<MuteProps> = (props) => {
  return (
    <Svg viewBox="0 0 22.83 22.83" width={props.size} height={props.size}>
      <G data-name="Layer 2">
        <Path
          d="M11.4 0a11.42 11.42 0 1011.43 11.4A11.43 11.43 0 0011.4 0zm0 21a9.48 9.48 0 01-6.35-2.41l3.85-3.85h.32l4 3.73.17.13a1.53 1.53 0 002.3-1.32V7.94l2.87-2.88A9.56 9.56 0 0111.43 21zM14 9.68v7.09l-3.68-3.41zM7.86 13H7V9.46h2.34a1.52 1.52 0 00.76-.21l3.84-3.56v1.23zm7.82-7.84a1.51 1.51 0 00-.77-1.32 1.5 1.5 0 00-1.52 0L9.23 7.72H6.74a1.54 1.54 0 00-1.53 1.53v4a1.52 1.52 0 001 1.42l-2.46 2.47a9.56 9.56 0 0113.37-13.4z"
          fill={props.color}
          data-name="Layer 1"
        />
      </G>
    </Svg>
  );
};

export default Mute;
