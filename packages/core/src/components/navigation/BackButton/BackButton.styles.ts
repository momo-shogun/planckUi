import { StyleSheet } from 'react-native';
import { getHeaderTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type Tokens = ReturnType<typeof getHeaderTokens>;

export function createBackButtonStyles(tokens: Tokens, theme: SemanticTokens) {
  const { spacing } = theme;
  const size = spacing[3];

  return StyleSheet.create({
    root: {
      width: spacing[10],
      height: spacing[10],
      alignItems: 'center',
      justifyContent: 'center',
    },
    chevron: {
      position: 'relative',
      width: size,
      height: size,
      justifyContent: 'center',
    },
    arm: {
      position: 'absolute',
      width: size * 0.55,
      height: 2,
      borderRadius: 1,
      backgroundColor: tokens.iconColor,
      left: size * 0.15,
    },
    armUp: {
      top: size * 0.32,
      transform: [{ rotate: '-45deg' }],
    },
    armDown: {
      bottom: size * 0.32,
      transform: [{ rotate: '45deg' }],
    },
  });
}
