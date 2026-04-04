import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { defaultTheme } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';
import { ThemeContext } from './ThemeContext';

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: SemanticTokens;
  darkTheme?: SemanticTokens;
  overrides?: Partial<SemanticTokens['colors']>;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const {
    children,
    theme = defaultTheme,
    darkTheme,
    overrides,
  } = props;
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const value = useMemo(() => {
    const base = isDark && darkTheme !== undefined ? darkTheme : theme;
    if (!overrides) {
      return base;
    }
    return {
      ...base,
      colors: {
        ...base.colors,
        ...overrides,
      },
    };
  }, [theme, darkTheme, overrides, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
