import React from 'react';
import {View} from 'react-native';
import type {SemanticTokens} from '@my-ui-lib/tokens';

const demoSize = 22;

/** Simple filled shapes for tab bar demos (no icon font). */
export function tabBarDemoIcon(
  theme: SemanticTokens,
  shape: 'circle' | 'square',
): (isActive: boolean) => React.ReactNode {
  return (isActive: boolean) => {
    const fill = isActive ? theme.colors.primary : theme.colors.border;
    return (
      <View
        style={{
          width: demoSize,
          height: demoSize,
          borderRadius: shape === 'circle' ? demoSize / 2 : 4,
          backgroundColor: fill,
        }}
      />
    );
  };
}
