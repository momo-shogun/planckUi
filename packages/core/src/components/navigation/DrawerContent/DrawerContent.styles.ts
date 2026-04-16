import { StyleSheet } from 'react-native';
import { colorWithOpacity, getDrawerContentTokens } from '@my-ui-lib/tokens';
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
      paddingHorizontal: spacing[2],
      paddingTop: spacing[3],
      paddingBottom: spacing[4],
    },

    // ─── Header (brand area) ─────────────────────────────────────────────────
    header: {
      paddingHorizontal: spacing[1],
      paddingBottom: spacing[3],
      marginBottom: spacing[1],
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tokens.border,
    },

    // ─── Nav items ───────────────────────────────────────────────────────────
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[3],
      paddingVertical: spacing[2],
      paddingLeft: spacing[2] + 3, // 3 = activeBar width so label stays aligned
      paddingRight: spacing[2],
      borderRadius: radii.lg,
      backgroundColor: tokens.itemBg,
      marginBottom: spacing[1],
      minHeight: 44,
    },
    itemActive: {
      backgroundColor: tokens.itemBgActive,
    },

    /** Animated left pill – 3 px wide, absolutely positioned inside the row. */
    activeBar: {
      position: 'absolute',
      left: 0,
      top: 8,
      bottom: 8,
      width: 3,
      borderRadius: 2,
      backgroundColor: tokens.activeBar,
    },

    // ─── Icon container ───────────────────────────────────────────────────────
    iconContainer: {
      width: 34,
      height: 34,
      borderRadius: radii.md,
      backgroundColor: colorWithOpacity(theme.colors.textSecondary, 0.06),
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainerActive: {
      backgroundColor: colorWithOpacity(theme.colors.primary, 0.12),
    },

    // ─── Labels ───────────────────────────────────────────────────────────────
    itemLabel: {
      flex: 1,
      fontSize: fontSizes.md,
      fontWeight: fontWeights.medium as '500',
      color: tokens.itemLabel,
    },
    itemLabelActive: {
      color: tokens.itemLabelActive,
      fontWeight: fontWeights.semibold as '600',
    },

    // ─── Badge pill ───────────────────────────────────────────────────────────
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

    // ─── Footer ───────────────────────────────────────────────────────────────
    footer: {
      marginTop: 'auto',
      paddingTop: spacing[3],
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: tokens.border,
    },

    // Content wrapper for the scrollable list
    itemsContentContainer: {
      flexGrow: 1,
    },
  });
}
