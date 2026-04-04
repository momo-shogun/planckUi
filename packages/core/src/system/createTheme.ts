import { defaultTheme } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export function createTheme(overrides: Partial<SemanticTokens>): SemanticTokens {
  return {
    ...defaultTheme,
    ...overrides,
    colors: {
      ...defaultTheme.colors,
      ...(overrides.colors ?? {}),
    },
  };
}
