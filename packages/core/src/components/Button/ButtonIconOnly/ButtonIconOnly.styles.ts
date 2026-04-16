import { Platform, StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export type ButtonIconOnlyVariant = 'ghost' | 'soft' | 'outline' | 'solid';
export type ButtonIconOnlySize = 'sm' | 'md' | 'lg';

export function createButtonIconOnlyStyles(
  theme: SemanticTokens,
  {
    size,
    variant,
  }: {
    size: ButtonIconOnlySize;
    variant: ButtonIconOnlyVariant;
  }
) {
  const { spacing, radii, colors } = theme;

  const sizeMap = {
    sm: { d: 40, p: spacing[2] },
    md: { d: 56, p: spacing[3] },
    lg: { d: 72, p: spacing[4] },
  } as const;
  const s = sizeMap[size];

  const shadowSoft = Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.22,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
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

  const base = {
    width: s.d,
    height: s.d,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    padding: s.p,
  } as const;

  const variantBase = (() => {
    switch (variant) {
      case 'ghost':
        return { backgroundColor: 'transparent', borderWidth: 0, ...(shadowOff ?? {}) };
      case 'soft':
        return { backgroundColor: colors.surfaceRaised, borderWidth: 0, ...(shadowOff ?? {}) };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
          ...(shadowOff ?? {}),
        };
      case 'solid':
        return {
          backgroundColor: colors.textPrimary,
          borderWidth: 0,
          ...(shadowOff ?? {}),
        };
    }
  })();

  return StyleSheet.create({
    root: {
      ...base,
      ...variantBase,
      overflow: 'hidden',
    },
  });
}

