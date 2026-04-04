const path = require('path');

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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@my-ui-lib/core',
    '@my-ui-lib/tokens',
    'react-native',
    'react-native-web',
  ],
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      react: reactDir,
      'react-dom': reactDomDir,
      'react/jsx-runtime': path.join(reactDir, 'jsx-runtime.js'),
      'react/jsx-dev-runtime': path.join(reactDir, 'jsx-dev-runtime.js'),
    };
    return config;
  },
};

module.exports = withNextra(nextConfig);
