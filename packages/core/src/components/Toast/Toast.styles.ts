import { StyleSheet } from 'react-native';
import { getToastTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type ToastTokens = ReturnType<typeof getToastTokens>;

export function createToastStyles(tokens: ToastTokens, theme: SemanticTokens) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  return StyleSheet.create({
    host: {
      position: 'absolute',
      left: spacing[4],
      right: spacing[4],
      bottom: spacing[6],
      gap: spacing[2],
      pointerEvents: 'box-none',
    },
    root: {
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: tokens.border,
      backgroundColor: tokens.bg,
      borderLeftWidth: 4,
      borderLeftColor: tokens.accentBorder,
      paddingHorizontal: spacing[3],
      paddingTop: spacing[3],
      paddingBottom: spacing[1],
      overflow: 'hidden',
    },
    title: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semibold as '600',
      color: tokens.titleColor,
    },
    description: {
      marginTop: spacing[1],
      fontSize: fontSizes.xs,
      color: tokens.descriptionColor,
    },
    progressTrack: {
      marginTop: spacing[2],
      height: 3,
      borderRadius: radii.sm,
      backgroundColor: tokens.progressTrack,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: tokens.accentBorder,
    },
  });
}
