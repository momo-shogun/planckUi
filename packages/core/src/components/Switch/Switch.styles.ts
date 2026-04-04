import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type SwitchTokens = ReturnType<
  typeof import('@my-ui-lib/tokens').getSwitchTokens
>;

const GEOM = {
  sm: { trackW: 36, trackH: 20, thumb: 16 },
  md: { trackW: 44, trackH: 24, thumb: 20 },
  lg: { trackW: 52, trackH: 28, thumb: 24 },
} as const;

export function createSwitchStyles(
  tokens: SwitchTokens,
  theme: SemanticTokens,
  size: keyof typeof GEOM
) {
  const { trackW, trackH, thumb } = GEOM[size];
  const pad = 2;

  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2],
    },
    track: {
      width: trackW,
      height: trackH,
      borderRadius: trackH / 2,
      borderWidth: 1,
      borderColor: tokens.borderColor,
      position: 'relative',
      overflow: 'hidden',
    },
    trackLayer: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: trackH / 2,
    },
    thumb: {
      position: 'absolute',
      left: pad,
      top: (trackH - thumb) / 2,
      width: thumb,
      height: thumb,
      borderRadius: thumb / 2,
      backgroundColor: tokens.thumbBg,
      shadowColor: tokens.borderColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 2,
    },
    label: {
      fontSize:
        size === 'sm'
          ? theme.fontSizes.sm
          : size === 'md'
            ? theme.fontSizes.sm
            : theme.fontSizes.md,
      color: tokens.labelColor,
    },
  });
}

export const SWITCH_GEOM = GEOM;
