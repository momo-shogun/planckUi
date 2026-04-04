import React from 'react';
import {View} from 'react-native';
import type {SemanticTokens} from '@my-ui-lib/tokens';

export function tabBarDemoIcon(
  theme: SemanticTokens,
  shape: 'circle' | 'square',
): (isActive: boolean) => React.ReactNode {
  return (isActive: boolean) => (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: shape === 'circle' ? 11 : 4,
        backgroundColor: isActive ? theme.colors.primary : theme.colors.border,
      }}
    />
  );
}
