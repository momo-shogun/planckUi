import { StyleSheet } from 'react-native';
import { getButtonTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type ButtonTokenReturn = ReturnType<typeof getButtonTokens>;

export function createButtonStyles(
  tokens: ButtonTokenReturn,
  size: 'sm' | 'md' | 'lg',
  theme: SemanticTokens
) {
  const { spacing, radii } = theme;
  const sizeMap = {
    sm: { paddingH: spacing[2], paddingV: spacing[1], radius: radii.sm },
    md: { paddingH: spacing[4], paddingV: spacing[2], radius: radii.md },
    lg: { paddingH: spacing[6], paddingV: spacing[3], radius: radii.md },
  } as const;
  const s = sizeMap[size];

  return StyleSheet.create({
    root: {
      backgroundColor: tokens.bg,
      borderColor: tokens.border,
      borderWidth: 1,
      paddingHorizontal: s.paddingH,
      paddingVertical: s.paddingV,
      borderRadius: s.radius,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    text: {
      color: tokens.text,
    },
    loader: {
      marginRight: spacing[2],
    },
  });
}
