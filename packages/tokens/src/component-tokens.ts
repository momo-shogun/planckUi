import type { SemanticTokens } from './semantic';

export function getButtonTokens(
  theme: SemanticTokens,
  variant: 'primary' | 'outline' | 'ghost'
): { bg: string; bgPress: string; text: string; border: string } {
  const { colors } = theme;
  switch (variant) {
    case 'primary':
      return {
        bg: colors.primary,
        bgPress: colors.primaryHover,
        text: colors.primaryForeground,
        border: colors.primary,
      };
    case 'outline':
      return {
        bg: 'transparent',
        bgPress: colors.surfaceRaised,
        text: colors.primary,
        border: colors.border,
      };
    case 'ghost':
      return {
        bg: 'transparent',
        bgPress: colors.surfaceRaised,
        text: colors.primary,
        border: 'transparent',
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function getInputTokens(theme: SemanticTokens): {
  bg: string;
  border: string;
  borderFocus: string;
  borderError: string;
  text: string;
  placeholder: string;
  label: string;
} {
  const { colors } = theme;
  return {
    bg: colors.surface,
    border: colors.border,
    borderFocus: colors.borderFocus,
    borderError: colors.destructive,
    text: colors.textPrimary,
    placeholder: colors.textDisabled,
    label: colors.textSecondary,
  };
}

export function getModalTokens(theme: SemanticTokens): {
  overlay: string;
  surface: string;
  border: string;
} {
  const { colors } = theme;
  return {
    overlay: colors.overlay,
    surface: colors.surfaceRaised,
    border: colors.border,
  };
}

export function getToastTokens(
  theme: SemanticTokens,
  intent: 'info' | 'success' | 'error' | 'warning'
): { bg: string; text: string; border: string } {
  const { colors } = theme;
  switch (intent) {
    case 'info':
      return {
        bg: colors.surfaceRaised,
        text: colors.textPrimary,
        border: colors.border,
      };
    case 'success':
      return {
        bg: colors.surface,
        text: colors.success,
        border: colors.success,
      };
    case 'error':
      return {
        bg: colors.surface,
        text: colors.destructive,
        border: colors.destructive,
      };
    case 'warning':
      return {
        bg: colors.surface,
        text: colors.warning,
        border: colors.warning,
      };
    default: {
      const _exhaustive: never = intent;
      return _exhaustive;
    }
  }
}
