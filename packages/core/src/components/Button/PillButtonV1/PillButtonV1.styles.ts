import { Platform, StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export type PillButtonV1Variant = 'default' | 'secondary' | 'outline' | 'ghost';
export type PillButtonV1Size = 'sm' | 'md' | 'lg';

export function createPillButtonV1Styles(
  theme: SemanticTokens,
  {
    size,
    variant,
  }: {
    size: PillButtonV1Size;
    variant: PillButtonV1Variant;
  }
) {
  const { spacing, radii, fontSizes, fontWeights, colors } = theme;

  const sizeMap = {
    sm: { minHeight: 36, paddingH: spacing[5], fontSize: fontSizes.md },
    md: { minHeight: 48, paddingH: spacing[7], fontSize: fontSizes.lg },
    lg: { minHeight: 56, paddingH: spacing[8], fontSize: fontSizes.xl },
  } as const;

  const s = sizeMap[size];

  const baseShadow = Platform.select({
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
  });

  const shadowOff = Platform.select({
    ios: { shadowOpacity: 0, shadowRadius: 0, shadowOffset: { width: 0, height: 0 } },
    android: { elevation: 0 },
    default: {},
  });

  const variantRoot = (() => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          ...(baseShadow ?? {}),
        };
      case 'secondary':
        return {
          backgroundColor: colors.surfaceRaised,
          borderWidth: 0,
          ...(shadowOff ?? {}),
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
          ...(shadowOff ?? {}),
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          ...(shadowOff ?? {}),
        };
    }
  })();

  return StyleSheet.create({
    root: {
      minHeight: s.minHeight,
      paddingHorizontal: s.paddingH,
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      ...variantRoot,
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
      fontSize: s.fontSize,
      fontWeight: fontWeights.semibold as '600',
      letterSpacing: 0.2,
    },
    disabledOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255,255,255,0.12)',
    },
  });
}

