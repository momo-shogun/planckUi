import { StyleSheet } from 'react-native';
import { getHeaderTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';
import type { HeaderVariant } from '@my-ui-lib/tokens';

type Tokens = ReturnType<typeof getHeaderTokens>;

export function createHeaderStyles(
  tokens: Tokens,
  theme: SemanticTokens,
  variant: HeaderVariant
) {
  const { spacing, fontSizes, fontWeights } = theme;

  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: spacing[12],
      paddingHorizontal: spacing[2],
      backgroundColor: tokens.bg,
      borderBottomWidth: variant === 'transparent' ? 0 : StyleSheet.hairlineWidth,
      borderColor: tokens.border,
    },
    side: {
      minWidth: spacing[12],
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    sideRight: {
      alignItems: 'flex-end',
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing[2],
    },
    title: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.semibold as '600',
      color: tokens.titleColor,
      textAlign: 'center',
    },
    subtitle: {
      marginTop: 2,
      fontSize: fontSizes.xs,
      color: tokens.subtitleColor,
      textAlign: 'center',
    },
  });
}
