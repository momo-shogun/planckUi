import React from 'react';
import {Circle, Square} from 'lucide-react-native';
import type {SemanticTokens} from '@my-ui-lib/tokens';

const demoSize = 22;
const stroke = 0;

export function tabBarDemoIcon(
  theme: SemanticTokens,
  shape: 'circle' | 'square',
): (isActive: boolean) => React.ReactNode {
  return (isActive: boolean) => {
    const fill = isActive ? theme.colors.primary : theme.colors.border;
    const Icon = shape === 'circle' ? Circle : Square;
    return (
      <Icon
        size={demoSize}
        color={fill}
        fill={fill}
        stroke={fill}
        strokeWidth={stroke}
      />
    );
  };
}
