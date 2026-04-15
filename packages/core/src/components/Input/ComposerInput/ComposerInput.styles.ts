import { StyleSheet, Platform } from 'react-native';
import { getComposerInputTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type ComposerTokenReturn = ReturnType<typeof getComposerInputTokens>;

export function createComposerInputStyles(
  tokens: ComposerTokenReturn,
  theme: SemanticTokens,
  focused: boolean,
  disabled: boolean
) {
  const { spacing, radii, fontSizes, fontWeights } = theme;
  const opacity = disabled ? 0.48 : 1;

  // Elevated shadow for the shell — soft and layered
  const shellShadow = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: focused ? 0.1 : 0.06,
      shadowRadius: focused ? 12 : 6,
    },
    android: {
      elevation: focused ? 6 : 3,
    },
    default: {},
  });

  return StyleSheet.create({
    // ── Shell ──────────────────────────────────────────────────────────────
    root: {
      borderWidth: 0,
      backgroundColor: tokens.shellBg,
      borderRadius: radii.xl ?? 20,
      paddingHorizontal: spacing[3],
      paddingTop: spacing[2],
      paddingBottom: spacing[2],
      flexDirection: 'column',
      gap: spacing[2],
      opacity,
      ...shellShadow,
    },

    // Top row — chips + input
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      minHeight: spacing[6],
    },

    // ── Chips ──────────────────────────────────────────────────────────────
    chipsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      flexShrink: 1,
      flexWrap: 'nowrap',
      overflow: 'hidden',
    },

    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderRadius: radii.full,
      borderWidth: 0,
      backgroundColor: tokens.chipBg,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1],
      maxWidth: 160,
    },
    chipIconWrap: {
      width: 14,
      height: 14,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },

    chipText: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium as '500',
      color: tokens.chipText,
      flexShrink: 1,
    },

    chipCount: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semibold as '600',
      color: tokens.chipCountText,
      flexShrink: 0,
    },

    // ── Input ──────────────────────────────────────────────────────────────
    center: {
      flex: 1,
      minWidth: 0,
    },

    input: {
      flex: 1,
      minWidth: 0,
      paddingVertical: 0,
      fontSize: fontSizes.md,
      lineHeight: fontSizes.md * 1.45,
      color: tokens.text,
      // Prevents default outline ring on web
      ...(Platform.OS === 'web' ? ({ outlineWidth: 0 } as object) : {}),
    },

    // ── Bottom row — actions ───────────────────────────────────────────────
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    leftActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
    },

    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
    },

    // ── Action buttons ─────────────────────────────────────────────────────
    actionCircle: {
      width: spacing[8],
      height: spacing[8],
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.iconBg,
      borderWidth: 0,
    },

    actionCirclePressed: {
      backgroundColor: tokens.iconBgHover,
    },

    // ── Send button ────────────────────────────────────────────────────────
    sendCircle: {
      width: spacing[8],
      height: spacing[8],
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.sendBg,
      // No border — solid fill reads as primary CTA
      borderWidth: 0,
    },

    sendCircleDisabled: {
      backgroundColor: tokens.sendBgDisabled,
    },

    // ── Misc icon color helpers (kept for backward compat) ─────────────────
    iconColor: {
      color: tokens.iconFg,
    },

    sendIconColor: {
      color: tokens.sendFg,
    },

    sendIconColorDisabled: {
      color: tokens.sendFgDisabled,
    },
  });
}