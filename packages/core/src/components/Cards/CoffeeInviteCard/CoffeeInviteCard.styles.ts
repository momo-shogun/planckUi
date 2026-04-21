import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export function createCoffeeInviteCardStyles(theme: SemanticTokens) {
  const { spacing, radii, colors, fontSizes, fontWeights } = theme;

  // Warm neutrals to match the reference card.
  const border = 'rgba(70, 52, 36, 0.18)';
  const surface = '#fbf6ee';
  const accent = '#3f2d1f';
  const muted = 'rgba(63, 45, 31, 0.70)';
  const muted2 = 'rgba(63, 45, 31, 0.45)';

  return StyleSheet.create({
    root: {
      width: 260,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: border,
      backgroundColor: surface,
      padding: spacing[4],
      alignItems: 'center',
    },

    avatarWrap: {
      width: 116,
      height: 116,
      borderRadius: 58,
      backgroundColor: '#9bbf1f',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing[1],
      marginBottom: spacing[3],
      overflow: 'hidden',
    },

    name: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold as '700',
      color: accent,
      letterSpacing: -0.2,
      textAlign: 'center',
    },

    role: {
      marginTop: 2,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium as '500',
      color: muted,
      textAlign: 'center',
    },

    handle: {
      marginTop: 2,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium as '500',
      color: muted2,
      textAlign: 'center',
    },

    mutualsRow: {
      marginTop: spacing[3],
      marginBottom: spacing[3],
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
      color: muted,
      fontWeight: fontWeights.medium as '500',
    },

    primaryButtonText: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.semibold as '600',
      color: accent,
    },

    primaryButton: {
      minHeight: 44,
      paddingHorizontal: spacing[6],
      borderWidth: 1,
      borderColor: 'rgba(63, 45, 31, 0.50)',
      backgroundColor: 'transparent',
    },

    secondaryPressable: {
      marginTop: spacing[3],
      paddingVertical: spacing[1],
      paddingHorizontal: spacing[2],
    },

    secondaryText: {
      fontSize: fontSizes.sm,
      color: muted2,
      fontWeight: fontWeights.medium as '500',
    },
  });
}

