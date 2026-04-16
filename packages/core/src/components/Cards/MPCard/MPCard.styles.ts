import { Platform, StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export function createMPCardStyles(theme: SemanticTokens) {
  const { spacing, radii, fontSizes, fontWeights, colors } = theme;

  const shadow = Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.12,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 5,
    },
    default: {},
  });

  return StyleSheet.create({
    root: {
      position: 'relative',
      // Screenshot has a more pill-card feel than our default tokens radius
      borderRadius: 24,
      overflow: 'hidden',
      padding: spacing[5],
      backgroundColor: colors.surface,
      ...shadow,
    },
    gradientContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    gradientSvg: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    content: {
      position: 'relative',
      gap: spacing[3],
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing[3],
    },
    identity: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[3],
      flex: 1,
      minWidth: 0,
    },
    name: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.semibold as '600',
      fontFamily: 'Montserrat-SemiBold',
      color: colors.textPrimary,
      letterSpacing: -0.2,
    },
    subtitle: {
      marginTop: 2,
      fontSize: fontSizes.md,
      fontFamily: 'Montserrat-Regular',
      color: colors.textSecondary,
      letterSpacing: -0.1,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.60)',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(255,255,255,0.55)',
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: spacing[3],
    },
    progressBlock: {
      flex: 1,
      minWidth: 0,
    },
    progressLabel: {
      fontSize: fontSizes.md,
      color: colors.textPrimary,
      marginBottom: spacing[2],
      letterSpacing: 0.0,
      fontFamily: 'Montserrat-Medium',
    },
    progressTrack: {
      height: 12,
      borderRadius: 999,
      backgroundColor: 'rgba(0,0,0,0.10)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 999,
      backgroundColor: '#65a30d',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
    },
  });
}

