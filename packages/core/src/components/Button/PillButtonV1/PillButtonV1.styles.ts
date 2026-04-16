import { Platform, StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export function createPillButtonV1Styles(theme: SemanticTokens) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  return StyleSheet.create({
    root: {
      minHeight: 48,
      paddingHorizontal: spacing[7],
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOpacity: 0.22,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
        },
        android: {
          elevation: 6,
        },
        default: {},
      }),
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
    text: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semibold as '600',
      letterSpacing: 0.2,
    },
    disabledOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255,255,255,0.12)',
    },
  });
}

