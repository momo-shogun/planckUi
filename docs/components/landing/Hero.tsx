import React from 'react';
import Link from 'next/link';
import { useTheme } from '@my-ui-lib/core';

export function LandingHero() {
  const theme = useTheme();

  return (
    <section style={{ paddingTop: 24, paddingBottom: 8 }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid rgba(148,163,184,0.25)',
          borderRadius: 999,
          padding: '6px 10px',
          background: 'rgba(255,255,255,0.02)',
          marginBottom: 14,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: theme.colors.success,
            boxShadow: `0 0 0 3px rgba(34,197,94,0.14)`,
          }}
        />
        <span style={{ fontSize: 12, color: 'rgba(226,232,240,0.78)', fontWeight: 600 }}>
          Copy‑paste components for React Native CLI
        </span>
      </div>

      <h1
        style={{
          fontSize: 52,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          margin: 0,
          color: theme.colors.textPrimary,
          fontWeight: 900,
        }}
      >
        Build UI you own.
        <br />
        Ship fast.
      </h1>

      <p
        style={{
          marginTop: 14,
          marginBottom: 20,
          maxWidth: 640,
          fontSize: 16,
          lineHeight: 1.6,
          color: theme.colors.textSecondary,
        }}
      >
        planckUi is a headless, token‑first UI library for RN CLI. No Expo Go. No Tailwind. Just
        source code you can copy, tweak, and ship.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link
          href="/quickstart"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 42,
            padding: '0 16px',
            borderRadius: 12,
            background: theme.colors.textPrimary,
            color: theme.colors.primaryForeground,
            fontWeight: 800,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Quick start
        </Link>
        <Link
          href="/components"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 42,
            padding: '0 16px',
            borderRadius: 12,
            background: 'rgba(148,163,184,0.10)',
            color: theme.colors.textPrimary,
            border: '1px solid rgba(148,163,184,0.22)',
            fontWeight: 800,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Browse components
        </Link>
      </div>

      <pre
        style={{
          marginTop: 18,
          marginBottom: 0,
          padding: '12px 14px',
          borderRadius: 14,
          border: '1px solid rgba(148,163,184,0.18)',
          background: 'rgba(2,6,23,0.55)',
          color: 'rgba(226,232,240,0.92)',
          overflowX: 'auto',
          maxWidth: 720,
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        <code>{`npm install @my-ui-lib/tokens @my-ui-lib/core\nnpx my-ui-lib add button`}</code>
      </pre>
    </section>
  );
}

