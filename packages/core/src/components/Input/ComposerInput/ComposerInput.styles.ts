import { StyleSheet } from 'react-native';
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
  const borderColor = focused ? tokens.shellBorderFocus : tokens.shellBorder;
  const opacity = disabled ? 0.55 : 1;

  return StyleSheet.create({
    root: {
      borderWidth: 1,
      borderColor,
      backgroundColor: tokens.shellBg,
      borderRadius: radii.full,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[2],
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      opacity,
    },
    leftActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      flexShrink: 0,
    },
    actionCircle: {
      width: spacing[9],
      height: spacing[9],
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.iconBg,
    },
    actionCirclePressed: {
      backgroundColor: tokens.iconBgHover,
    },
    center: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      flex: 1,
      minWidth: 0,
    },
    input: {
      flex: 1,
      minWidth: 0,
      paddingVertical: 0,
      fontSize: fontSizes.md,
      color: tokens.text,
    },
    chipsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      flexShrink: 0,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      borderRadius: radii.full,
      borderWidth: 1,
      borderColor: tokens.chipBorder,
      backgroundColor: tokens.chipBg,
      paddingHorizontal: spacing[2],
      height: spacing[9],
      maxWidth: 180,
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
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      flexShrink: 0,
    },
    sendCircle: {
      width: spacing[9],
      height: spacing[9],
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.sendBg,
      borderWidth: 1,
      borderColor: tokens.shellBorder,
    },
    sendCircleDisabled: {
      backgroundColor: tokens.sendBgDisabled,
      borderColor: tokens.shellBorder,
    },
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

