import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export type RefreshProps = Props;
const Failed: React.FC<RefreshProps> = (props) => {
  return (
    <Svg viewBox="0 0 80 80" width={props.size} height={props.size} {...props}>
      <G fill="#e15b64">
        <Path d="M11.722 68.39c-2.51-1.445-3.333-4.807-1.758-7.296 6.72-10.626 14.672-20.264 23.342-28.88 8.732-8.69 18.166-16.392 27.93-23.418 2.218-1.596 5.256-1.075 6.846 1.188 1.542 2.195 1.176 5.262-.848 6.986-8.89 7.564-17.273 15.646-24.76 24.413C35.1 50 28.629 59.296 23.398 69.19c-1.322 2.501-4.338 3.421-6.743 2.038l-4.933-2.838z" />
        <Path d="M62.991 65.95c-2.453 1.444-5.633.698-7.133-1.721C50.765 56.015 44.224 48.454 36.9 41.51c-7.445-7.061-15.67-13.525-24.232-19.675a5.275 5.275 0 01-1.346-7.158l.984-1.516a5.287 5.287 0 017.224-1.61c9.257 5.752 18.37 11.954 26.988 19.091 8.539 7.081 16.622 15.167 23.33 24.577 1.805 2.532 1.07 6.067-1.611 7.644L62.99 65.95z" />
      </G>
    </Svg>
  );
};
export default Failed;
