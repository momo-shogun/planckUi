import { createContext, useContext } from 'react';
import { defaultTheme } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export const ThemeContext = createContext<SemanticTokens>(defaultTheme);

export const useTheme = (): SemanticTokens => useContext(ThemeContext);
