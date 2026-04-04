import type { GeneratedTokens } from './generated/types';

/**
 * Contract every theme object must satisfy. Keep keys aligned with {@link GeneratedTokens}.
 */
export interface SemanticTokens {
  colors: {
    background: string;
    surface: string;
    surfaceRaised: string;
    overlay: string;
    primary: string;
    primaryHover: string;
    primaryForeground: string;
    textPrimary: string;
    textSecondary: string;
    textDisabled: string;
    border: string;
    borderFocus: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    warning: string;
  };
  spacing: Record<string, number>;
  radii: Record<string, number>;
  fontSizes: Record<string, number>;
  fontWeights: Record<string, string>;
}

type GeneratedSemanticColors = GeneratedTokens['semantic']['color'];

type AssertColorsMatch = GeneratedSemanticColors extends SemanticTokens['colors']
  ? SemanticTokens['colors'] extends GeneratedSemanticColors
    ? true
    : never
  : never;

/** Compile-time check that generated semantic colors stay in sync with the public contract */
export type _SemanticColorContract = AssertColorsMatch;
