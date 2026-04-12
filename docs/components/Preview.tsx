import React, { useState } from 'react';
import { PortalProvider, ThemeProvider, ToastProvider } from '@my-ui-lib/core';
import {
  defaultTheme,
  midnightTheme,
  oceanTheme,
  roseTheme,
} from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

const THEMES: Record<string, SemanticTokens> = {
  default: defaultTheme,
  ocean: oceanTheme,
  midnight: midnightTheme,
  rose: roseTheme,
};

const THEME_ORDER = ['default', 'ocean', 'midnight', 'rose'] as const;
type ThemeName = (typeof THEME_ORDER)[number];

const PRIMARY_DOT: Record<ThemeName, string> = {
  default: '#2563eb',
  ocean: '#0891b2',
  midnight: '#818cf8',
  rose: '#e11d48',
};

const LABEL: Record<ThemeName, string> = {
  default: 'default',
  ocean: 'ocean',
  midnight: 'midnight',
  rose: 'rose',
};

export interface PreviewProps {
  children: React.ReactNode;
  themeSwitcher?: boolean;
  minHeight?: number;
}

export function Preview({
  children,
  themeSwitcher = true,
  minHeight = 120,
}: PreviewProps) {
  const [active, setActive] = useState<ThemeName>('default');
  const theme = THEMES[active];
  const chrome = {
    border: theme.colors.border,
    panelBg: theme.colors.surface,
    activeBg: theme.colors.background,
    inactiveText: theme.colors.textSecondary,
  } as const;

  return (
    <div
      style={{
        border: `1px solid ${chrome.border}`,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 16,
        marginBottom: 16,
      }}
    >
      {themeSwitcher ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            padding: '12px 16px',
            borderBottom: `1px solid ${chrome.border}`,
            backgroundColor: chrome.panelBg,
          }}
        >
          {THEME_ORDER.map((name) => {
            const primary = PRIMARY_DOT[name];
            const isActive = active === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setActive(name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14,
                  backgroundColor: isActive ? chrome.activeBg : 'transparent',
                  border: isActive ? `1.5px solid ${primary}` : '1.5px solid transparent',
                  color: isActive ? primary : chrome.inactiveText,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 9999,
                    backgroundColor: primary,
                  }}
                  aria-hidden
                />
                {LABEL[name]}
              </button>
            );
          })}
        </div>
      ) : null}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 12,
          padding: 24,
          minHeight,
          backgroundColor: theme.colors.background,
        }}
      >
        <PortalProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </PortalProvider>
      </div>
    </div>
  );
}
