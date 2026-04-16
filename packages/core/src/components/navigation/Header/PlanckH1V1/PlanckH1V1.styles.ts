import { StyleSheet } from 'react-native';
import { getHeaderTokens } from '@my-ui-lib/tokens';
import type { HeaderVariant, SemanticTokens } from '@my-ui-lib/tokens';

type Tokens = ReturnType<typeof getHeaderTokens>;

export function createPlanckH1V1Styles(_tokens: Tokens, theme: SemanticTokens, _variant: HeaderVariant) {
  const { spacing, fontSizes, fontWeights, radii } = theme;

  return StyleSheet.create({
    root: {
      position: 'relative',
      minHeight: spacing[14],
      overflow: 'hidden',
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      minHeight: spacing[14],
    },

    // left: logo icon + brand wordmark inline
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      flex: 1,
      minWidth: 0,
    },
    logoIcon: {
      width: spacing[9],
      height: spacing[9],
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
    title: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold as '700',
      color: '#ffffff',
    },

    // right: row of circular icon buttons
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
    },
    iconButton: {
      position: 'relative',
    },
    iconButtonInner: {
      width: spacing[11],
      height: spacing[11],
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderWidth: 0,
    },
    notificationDot: {
      position: 'absolute',
      top: 2,
      right: 2,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#ec4899',
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.15)',
    },
  });
}