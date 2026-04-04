import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';
import type { BadgeSize } from './Badge.types';

type BadgeTokenReturn = ReturnType<
  typeof import('@my-ui-lib/tokens').getBadgeTokens
>;

export function createBadgeStyles(
  tokens: BadgeTokenReturn,
  theme: SemanticTokens,
  size: BadgeSize
) {
  const padH = { sm: theme.spacing[2], md: theme.spacing[3], lg: theme.spacing[4] }[
    size
  ];
  const padV = { sm: theme.spacing[1], md: theme.spacing[2], lg: theme.spacing[3] }[
    size
  ];
  const fontSize = {
    sm: theme.fontSizes.xs,
    md: theme.fontSizes.sm,
    lg: theme.fontSizes.md,
  }[size];
  const dotSize = { sm: 6, md: 8, lg: 10 }[size];

  return StyleSheet.create({
    root: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: padH,
      paddingVertical: padV,
      borderRadius: theme.radii.full,
      borderWidth: 1,
      borderColor: tokens.border,
      backgroundColor: tokens.bg,
      gap: theme.spacing[1],
    },
    label: {
      fontSize,
      fontWeight: theme.fontWeights.medium as '500',
      color: tokens.text,
    },
    dot: {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor: tokens.dotColor,
    },
  });
}
