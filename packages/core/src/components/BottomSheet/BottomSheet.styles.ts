import { StyleSheet } from 'react-native';
import { getBottomSheetTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type SheetTokens = ReturnType<typeof getBottomSheetTokens>;

export function createBottomSheetStyles(tokens: SheetTokens, theme: SemanticTokens) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  return StyleSheet.create({
    sheet: {
      backgroundColor: tokens.bg,
      borderTopLeftRadius: radii.lg,
      borderTopRightRadius: radii.lg,
      borderWidth: 1,
      borderColor: tokens.border,
    },
    handleIndicator: {
      backgroundColor: tokens.handleIndicator,
    },
    title: {
      paddingHorizontal: spacing[4],
      paddingTop: spacing[2],
      paddingBottom: spacing[2],
      fontSize: fontSizes.md,
      fontWeight: fontWeights.semibold as '600',
      color: tokens.titleColor,
    },
    content: {
      paddingHorizontal: spacing[4],
      paddingBottom: spacing[4],
    },
  });
}
