import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export function createCoffeeInviteCardStyles(
  theme: SemanticTokens,
  opts?: {
    cardBackgroundColor?: string;
    cardBorderColor?: string;
    avatarWrapBackgroundColor?: string;
    nameColor?: string;
    roleColor?: string;
    handleColor?: string;
    mutualTextColor?: string;
    primaryButtonBorderColor?: string;
    primaryButtonTextColor?: string;
    secondaryTextColor?: string;
  },
) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  // Warm neutrals to match the reference card.
  const border = opts?.cardBorderColor ?? 'rgba(70, 52, 36, 0.18)';
  const surface = opts?.cardBackgroundColor ?? '#fbf6ee';
  const accent = opts?.nameColor ?? '#3f2d1f';
  const muted = opts?.roleColor ?? 'rgba(63, 45, 31, 0.70)';
  const muted2 = opts?.handleColor ?? 'rgba(63, 45, 31, 0.45)';
  const mutualText = opts?.mutualTextColor ?? muted;
  const avatarWrapBg = opts?.avatarWrapBackgroundColor ?? '#9bbf1f';
  const primaryText = opts?.primaryButtonTextColor ?? accent;
  const primaryBorder = opts?.primaryButtonBorderColor ?? 'rgba(63, 45, 31, 0.50)';
  const secondaryText = opts?.secondaryTextColor ?? muted2;

  return StyleSheet.create({
    root: {
      width: 228,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: border,
      backgroundColor: surface,
      padding: spacing[3],
      alignItems: 'center',
    },

    avatarWrap: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: avatarWrapBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing[1],
      marginBottom: spacing[2],
      overflow: 'hidden',
    },

    name: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold as '700',
      color: accent,
      letterSpacing: -0.2,
      textAlign: 'center',
    },

    role: {
      marginTop: 2,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.medium as '500',
      color: muted,
      textAlign: 'center',
    },

    handle: {
      marginTop: 2,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.medium as '500',
      color: muted2,
      textAlign: 'center',
    },

    mutualsRow: {
      marginTop: spacing[2],
      marginBottom: spacing[2],
      alignItems: 'center',
    },

    mutualsAvatars: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing[2],
    },

    mutualAvatar: {
      borderWidth: 2,
      borderColor: surface,
    },

    mutualLabel: {
      fontSize: fontSizes.xs,
      color: mutualText,
      fontWeight: fontWeights.medium as '500',
    },

    primaryButtonText: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semibold as '600',
      color: primaryText,
    },

    primaryButton: {
      minHeight: 36,
      paddingHorizontal: spacing[5],
      borderWidth: 1,
      borderColor: primaryBorder,
      backgroundColor: 'transparent',
    },

    secondaryPressable: {
      marginTop: spacing[2],
      paddingVertical: spacing[1],
      paddingHorizontal: spacing[2],
    },

    secondaryText: {
      fontSize: fontSizes.xs,
      color: secondaryText,
      fontWeight: fontWeights.medium as '500',
    },
  });
}

