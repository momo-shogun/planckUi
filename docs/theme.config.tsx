import React from 'react';
import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
      planckUi
    </span>
  ),
  project: {
    link: 'https://github.com/your-org/planckUi',
  },
  docsRepositoryBase:
    'https://github.com/your-org/planckUi/tree/main/docs',
  useNextSeoProps() {
    const { asPath } = useRouter();
    return {
      titleTemplate: asPath === '/' ? 'planckUi' : '%s – planckUi',
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="planckUi — headless React Native UI library for CLI apps"
      />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 2,
    toggleButton: true,
  },
  toc: { backToTop: true },
  footer: {
    text: (
      <span style={{ fontSize: 14 }}>
        MIT {new Date().getFullYear()} ©{' '}
        <a
          href="https://github.com/your-org/planckUi"
          target="_blank"
          rel="noreferrer"
        >
          planckUi
        </a>
      </span>
    ),
  },
  primaryHue: 220,
  primarySaturation: 85,
};

export default config;
