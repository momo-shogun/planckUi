import {
  defaultTokens,
  midnightTokens,
  oceanTokens,
  roseTokens,
} from './generated/tokens';
import type { SemanticTokens } from './semantic';

export type { SemanticTokens } from './semantic';
export * from './component-tokens';

/** Resolved token tree shared by every generated theme */
interface ResolvedThemeTree {
  semantic: { color: SemanticTokens['colors'] };
  spacing: Record<string, number>;
  radii: Record<string, number>;
  fontSize: Record<string, number>;
  fontWeight: Record<string, string>;
}

function toSemanticTokens(raw: ResolvedThemeTree): SemanticTokens {
  const { semantic, spacing, radii, fontSize, fontWeight } = raw;
  return {
    colors: {
      background: semantic.color.background,
      surface: semantic.color.surface,
      surfaceRaised: semantic.color.surfaceRaised,
      overlay: semantic.color.overlay,
      primary: semantic.color.primary,
      primaryHover: semantic.color.primaryHover,
      primaryForeground: semantic.color.primaryForeground,
      textPrimary: semantic.color.textPrimary,
      textSecondary: semantic.color.textSecondary,
      textDisabled: semantic.color.textDisabled,
      border: semantic.color.border,
      borderFocus: semantic.color.borderFocus,
      destructive: semantic.color.destructive,
      destructiveForeground: semantic.color.destructiveForeground,
      success: semantic.color.success,
      warning: semantic.color.warning,
    },
    spacing: spacing as Record<string, number>,
    radii: radii as Record<string, number>,
    fontSizes: {
      xs: fontSize.xs,
      sm: fontSize.sm,
      md: fontSize.md,
      lg: fontSize.lg,
      xl: fontSize.xl,
      '2xl': fontSize['2xl'],
      '3xl': fontSize['3xl'],
    },
    fontWeights: {
      regular: fontWeight.regular,
      medium: fontWeight.medium,
      semibold: fontWeight.semibold,
      bold: fontWeight.bold,
    },
  };
}

export const defaultTheme: SemanticTokens = toSemanticTokens(defaultTokens);
export const oceanTheme: SemanticTokens = toSemanticTokens(oceanTokens);
export const midnightTheme: SemanticTokens = toSemanticTokens(midnightTokens);
export const roseTheme: SemanticTokens = toSemanticTokens(roseTokens);
