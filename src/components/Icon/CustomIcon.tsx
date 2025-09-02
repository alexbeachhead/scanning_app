import React from 'react';
import Svg, {Path} from 'react-native-svg';

// interface IconProps {
//   style?: ViewStyle;
//   color?: ColorValue;
// }

interface IconProps {
  color?: string;
}

export const ArrowLeft = ({color}: IconProps) => (
  <Svg width="22" height="24" viewBox="0 0 22 22" fill="none">
    <Path
      d="M10 2L2 12L10 22"
      stroke={color || '#ECEDEE'}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
