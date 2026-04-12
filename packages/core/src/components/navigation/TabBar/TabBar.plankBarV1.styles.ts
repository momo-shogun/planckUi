import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

/** Plank Bar V1 — dark bar, white pill on active, label only when active (design spec). */
export const PLANK_BAR_V1 = {
  barBg: '#000000',
  pillBg: '#FFFFFF',
  inactiveIcon: '#A2A2B5',
  activeFg: '#000000',
} as const;

export function createPlankBarV1Styles(theme: SemanticTokens) {
  const bottomRadius = Math.max(theme.radii.xl ?? theme.radii.lg ?? 16, 24);
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: PLANK_BAR_V1.barBg,
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[2],
      borderBottomLeftRadius: bottomRadius,
      borderBottomRightRadius: bottomRadius,
      borderTopWidth: 0,
    },
    inactiveCell: {
      flex: 1,
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      flexShrink: 0,
      backgroundColor: PLANK_BAR_V1.pillBg,
      borderRadius: 999,
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[2],
      maxWidth: '70%',
    },
    iconWrap: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelActive: {
      marginLeft: theme.spacing[2],
      fontSize: theme.fontSizes.sm,
      fontWeight: theme.fontWeights.bold as '700',
      color: PLANK_BAR_V1.activeFg,
    },
  });
}
