import { Platform, StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export function createMarqueeButtonStyles(
  theme: SemanticTokens,
  size: 'sm' | 'md' | 'lg'
) {
  const { spacing, radii, fontSizes, fontWeights, colors } = theme;

  const sizeMap = {
    sm: { minH: 36, paddingH: spacing[5], fontSize: fontSizes.md },
    md: { minH: 48, paddingH: spacing[7], fontSize: fontSizes.lg },
    lg: { minH: 56, paddingH: spacing[8], fontSize: fontSizes.xl },
  } as const;
  const s = sizeMap[size];

  const shadow = Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.18,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    },
    android: {
      elevation: 4,
    },
    default: {},
  });

  return StyleSheet.create({
    root: {
      minHeight: s.minH,
      paddingHorizontal: s.paddingH,
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      backgroundColor: colors.textPrimary,
      ...shadow,
    },
    left: {
      marginRight: spacing[3],
      alignItems: 'center',
      justifyContent: 'center',
    },
    right: {
      marginLeft: spacing[3],
      alignItems: 'center',
      justifyContent: 'center',
    },
    marqueeClip: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    marqueeRow: { flexDirection: 'row', overflow: 'hidden' },
    hidden: { opacity: 0, zIndex: -1 },
    translated: { position: 'absolute' },
    text: {
      fontSize: s.fontSize,
      fontWeight: fontWeights.semibold as '600',
      letterSpacing: 0.2,
      color: '#ffffff',
    },
  });
}

