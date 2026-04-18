import React from 'react';
import Svg, { Path } from 'react-native-svg';

type IconProps = {
  color: string;
  size?: number;
};

export function ZeptoLightningIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        fill={color}
      />
    </Svg>
  );
}

export function ZeptoChevronDownIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M8.12 9.29L12 13.17l3.88-3.88a1 1 0 111.41 1.41l-4.59 4.59a1 1 0 01-1.41 0L6.71 10.7a1 1 0 010-1.41z"
        fill={color}
      />
    </Svg>
  );
}

export function ZeptoWalletIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M21 7.28V5c0-1.1-.9-2-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72zM20 9v6h-7V9h7zM5 5h14v2H5V5zm14 14H5v-2h14v2z"
        fill={color}
      />
    </Svg>
  );
}

export function ZeptoProfileIcon({ color, size = 26 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
        fill={color}
      />
    </Svg>
  );
}
