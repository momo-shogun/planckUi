const path = require('path');

// Next 14.2+ lazily initializes `next/dist/compiled/webpack/webpack` via `init()`.
// Nextra 2.13 reads `webpack.Compilation` when its module loads; without init first,
// `webpack` is undefined → "Cannot read properties of undefined (reading 'Compilation')".
try {
  const nextWebpack = require('next/dist/compiled/webpack/webpack');
  if (typeof nextWebpack.init === 'function') {
    nextWebpack.init();
  }
} catch {
  /* ignore if resolution fails in an unusual layout */
}

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  readingTime: true,
});

function resolveFromDocs(pkg) {
  return path.dirname(
    require.resolve(`${pkg}/package.json`, { paths: [__dirname] })
  );
}

const reactDir = resolveFromDocs('react');
const reactDomDir = resolveFromDocs('react-dom');
/** File path so webpack never treats the alias as a package root that re-resolves to `react-native`. */
const reactNativeWebEntry = require.resolve('react-native-web', { paths: [__dirname] });
/** CJS shim so SSR never loads real `react-native-svg` (Fabric / wrong `react-native` resolution). */
const reactNativeSvgDocsMock = path.join(__dirname, 'mocks/react-native-svg.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Bundle node_modules into Pages Router server chunks so `react-native-svg` is not
  // `require`d at runtime (which bypasses webpack aliases and breaks SSR).
  experimental: {
    bundlePagesExternals: true,
  },
  transpilePackages: [
    '@my-ui-lib/core',
    '@my-ui-lib/tokens',
    // Do not list `react-native` — Next/SWC cannot compile RN’s Flow sources.
    'react-native-web',
  ],
  async redirects() {
    return [
      // Legacy folder routes → current top-level component pages
      { source: '/components/surfaces/button', destination: '/components/button', permanent: true },
      { source: '/components/surfaces/cards', destination: '/components/cards', permanent: true },
      { source: '/components/forms/input', destination: '/components/input', permanent: true },
    ];
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@gorhom/bottom-sheet': path.join(__dirname, 'mocks/gorhom-bottom-sheet.js'),
      '@gorhom/portal': path.join(__dirname, 'mocks/gorhom-portal.js'),
      // Docs-only: allow rendering components that depend on Reanimated on web.
      // The mock is sufficient for our preview widgets (no worklets).
      'react-native-reanimated': path.join(__dirname, 'mocks/react-native-reanimated.js'),
      'react-native$': reactNativeWebEntry,
      'react-native': reactNativeWebEntry,
      'react-native-svg': reactNativeSvgDocsMock,
      react: reactDir,
      'react-dom': reactDomDir,
      'react/jsx-runtime': path.join(reactDir, 'jsx-runtime.js'),
      'react/jsx-dev-runtime': path.join(reactDir, 'jsx-dev-runtime.js'),
    };
    return config;
  },
};

module.exports = withNextra(nextConfig);
