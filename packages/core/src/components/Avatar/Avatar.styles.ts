import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type AvatarTokens = ReturnType<
  typeof import('@my-ui-lib/tokens').getAvatarTokens
>;

const DIMENSION: Record<string, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

export function createAvatarStyles(
  tokens: AvatarTokens,
  theme: SemanticTokens,
  size: keyof typeof DIMENSION
) {
  const dim = DIMENSION[size];
  const fontSize = {
    xs: theme.fontSizes.xs,
    sm: theme.fontSizes.sm,
    md: theme.fontSizes.md,
    lg: theme.fontSizes.lg,
    xl: theme.fontSizes.xl,
  }[size];

  return StyleSheet.create({
    root: {
      width: dim,
      height: dim,
      borderRadius: tokens.borderRadius,
      borderWidth: 1,
      borderColor: tokens.borderColor,
      overflow: 'visible',
      position: 'relative',
    },
    image: {
      width: dim,
      height: dim,
      borderRadius: tokens.borderRadius,
    },
    fallback: {
      width: dim,
      height: dim,
      borderRadius: tokens.borderRadius,
      backgroundColor: tokens.bg,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    fallbackText: {
      fontSize,
      fontWeight: theme.fontWeights.semibold as '600',
      color: tokens.text,
    },
    personHead: {
      width: dim * 0.28,
      height: dim * 0.28,
      borderRadius: dim * 0.14,
      backgroundColor: tokens.text,
      opacity: 0.35,
      marginBottom: dim * 0.06,
    },
    personBody: {
      width: dim * 0.5,
      height: dim * 0.32,
      borderTopLeftRadius: dim * 0.25,
      borderTopRightRadius: dim * 0.25,
      backgroundColor: tokens.text,
      opacity: 0.35,
    },
    badge: {
      position: 'absolute',
      width: dim * 0.28,
      height: dim * 0.28,
      borderRadius: dim * 0.14,
      borderWidth: 2,
      borderColor: tokens.bg,
      bottom: -1,
      right: -1,
    },
  });
}
