import { StyleSheet } from 'react-native';
import { getInputTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type InputTokenReturn = ReturnType<typeof getInputTokens>;

export function createInputStyles(
  tokens: InputTokenReturn,
  theme: SemanticTokens,
  isFocused: boolean,
  hasError: boolean
) {
  const { spacing, radii, fontSizes, fontWeights } = theme;
  let borderColor = tokens.border;
  if (hasError) borderColor = tokens.borderError;
  else if (isFocused) borderColor = tokens.borderFocus;

  return StyleSheet.create({
    root: {
      marginBottom: spacing[2],
    },
    label: {
      marginBottom: spacing[1],
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium as '500',
      color: tokens.label,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor,
      borderRadius: radii.md,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
      backgroundColor: tokens.bg,
    },
    inputText: {
      fontSize: fontSizes.md,
      color: tokens.text,
    },
    errorText: {
      marginTop: spacing[1],
      fontSize: fontSizes.xs,
      color: tokens.borderError,
    },
  });
}
