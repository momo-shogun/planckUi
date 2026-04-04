import { StyleSheet } from 'react-native';
import { getDrawerContentTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type Tokens = ReturnType<typeof getDrawerContentTokens>;

export function createDrawerContentStyles(tokens: Tokens, theme: SemanticTokens) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: tokens.bg,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: tokens.border,
      paddingVertical: spacing[3],
    },
    header: {
      paddingHorizontal: spacing[4],
      paddingBottom: spacing[3],
    },
    footer: {
      paddingHorizontal: spacing[4],
      paddingTop: spacing[3],
      marginTop: 'auto',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: spacing[2],
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[3],
      borderRadius: radii.md,
      backgroundColor: tokens.itemBg,
    },
    itemActive: {
      backgroundColor: tokens.itemBgActive,
    },
    itemLabel: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.medium as '500',
      color: tokens.itemLabel,
    },
    itemLabelActive: {
      color: tokens.itemLabelActive,
      fontWeight: fontWeights.semibold as '600',
    },
    badge: {
      minWidth: spacing[5],
      paddingHorizontal: spacing[2],
      paddingVertical: 2,
      borderRadius: radii.full,
      backgroundColor: tokens.badgeBg,
      alignItems: 'center',
    },
    badgeText: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semibold as '600',
      color: tokens.badgeText,
    },
  });
}
