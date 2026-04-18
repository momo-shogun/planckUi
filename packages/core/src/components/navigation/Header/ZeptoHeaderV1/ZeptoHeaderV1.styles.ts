import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export function createZeptoHeaderV1Styles(theme: SemanticTokens) {
  const { spacing, fontSizes, fontWeights, radii } = theme;

  return StyleSheet.create({
    root: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      gap: spacing[3],
    },
    left: {
      flex: 1,
      minWidth: 0,
      gap: spacing[1],
    },
    etaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
    },
    etaText: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold as '700',
      letterSpacing: -0.2,
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginTop: 2,
    },
    addressText: {
      flex: 1,
      minWidth: 0,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular as '400',
      letterSpacing: -0.1,
    },
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
    },
    walletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
    },
    walletAmount: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold as '700',
      letterSpacing: -0.2,
    },
    profileTouch: {
      borderRadius: radii.full,
    },
  });
}
