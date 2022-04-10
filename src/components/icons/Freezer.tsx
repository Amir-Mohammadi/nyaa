import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type FreezerProps = Props;
const Freezer: React.FC<FreezerProps> = (props) => {
  return (
    <Svg viewBox="0 0 36.18 36.18" width={props.size} height={props.size}>
      <G data-name="Layer 2">
        <G data-name="Layer 1">
          <Path
            d="M33.63 17.8h-8l4.6-4.14-5.86.29 5.43-5.44-1.26-1.26L23 12.8l.33-6.13-4 4.45V3.39h-1.85v7.74l-4-4.47.31 6.13L8.2 7.21 6.93 8.47l5.42 5.44-5.86-.31 4.59 4.15h-8v1.79h7.72l-4.33 3.89 6.13-.3-5.7 5.68 1.26 1.27 5.56-5.54-.31 5.86 4-4.45v8h1.79V26l4 4.46-.2-5.9 5.54 5.56 1.27-1.27-5.69-5.7 6.13.32-4.3-3.9h7.72zm-19.4-2l2 2h-2.48l-2.33-2.11zm-2.82 5.59l2.05-1.84h2.73l-1.7 1.69zm6 1.89l-2 2.18.14-2.81 1.84-1.83zm0-6.78l-1.82-1.82-.15-3.09 2 2.2zm7.83-.83L23 17.78h-2.49l2-2zm-6-1.88l2-2.19-.17 3.09-1.82 1.81zm0 9.49v-2.45l1.83 1.83.14 2.81zm3-2l-1.69-1.7h2.73l2 1.85z"
            fill={props.color}
          />
          <Circle
            cx={18.09}
            cy={18.09}
            r={17.84}
            fill="none"
            stroke={props.color}
            strokeMiterlimit={10}
            strokeWidth={0.5}
          />
        </G>
      </G>
    </Svg>
  );
};

export default Freezer;
