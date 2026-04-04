import { StyleSheet } from 'react-native';
import { getModalTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type ModalTokenReturn = ReturnType<typeof getModalTokens>;

export function createModalStyles(tokens: ModalTokenReturn, theme: SemanticTokens) {
  const { spacing, radii, fontSizes } = theme;

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: tokens.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing[4],
    },
    surface: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: tokens.surface,
      borderWidth: 1,
      borderColor: tokens.border,
      borderRadius: radii.lg,
      padding: spacing[4],
    },
    title: {
      marginBottom: spacing[3],
      fontSize: fontSizes.lg,
    },
    body: {
      gap: spacing[3],
    },
  });
}
