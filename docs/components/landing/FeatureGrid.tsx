import React from 'react';
import { useTheme } from '@my-ui-lib/core';

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Copy‑paste ownership',
    description: 'You own the source. No wrappers, no magic.',
  },
  {
    title: 'Token‑first theming',
    description: 'Swap one object, change the whole system.',
  },
  {
    title: 'Headless by default',
    description: 'Use `unstyled` + `slots` to match your product.',
  },
  {
    title: 'RN CLI focused',
    description: 'Built for React Native CLI projects (0.73+).',
  },
  {
    title: 'Fast iteration',
    description: 'Preview in docs, copy into your app, ship.',
  },
  {
    title: 'Composable primitives',
    description: 'Small surfaces that play well together.',
  },
];

export function LandingFeatureGrid() {
  const theme = useTheme();

  return (
    <section style={{ paddingTop: 26, paddingBottom: 10 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 12,
        }}
      >
        {FEATURES.map((f) => (
          <div
            key={f.title}
            style={{
              borderRadius: 16,
              border: '1px solid rgba(148,163,184,0.16)',
              background: 'rgba(255,255,255,0.03)',
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: '-0.01em',
                color: theme.colors.textPrimary,
                marginBottom: 6,
              }}
            >
              {f.title}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: theme.colors.textSecondary }}>
              {f.description}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          section > div {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 560px) {
          section > div {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

