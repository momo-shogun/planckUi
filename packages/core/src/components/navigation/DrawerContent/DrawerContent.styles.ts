import { StyleSheet } from 'react-native';
import { colorWithOpacity, getDrawerContentTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type Tokens = ReturnType<typeof getDrawerContentTokens>;

export function createDrawerContentStyles(tokens: Tokens, theme: SemanticTokens) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  return StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'column',
      gap: spacing[2],
      backgroundColor: tokens.bg,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: tokens.border,
      paddingHorizontal: spacing[4],
      paddingTop: spacing[4],
      paddingBottom: spacing[6],
    },
    header: {
      paddingBottom: spacing[3],
      marginBottom: spacing[2],
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tokens.border,
    },
    footer: {
      paddingTop: spacing[4],
      marginTop: 'auto',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
      borderRadius: radii.md,
      backgroundColor: tokens.itemBg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: tokens.border,
      minHeight: 48,
    },
    itemActive: {
      backgroundColor: tokens.itemBgActive,
      borderColor: colorWithOpacity(theme.colors.primary, 0.45),
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
      paddingVertical: spacing[1],
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
