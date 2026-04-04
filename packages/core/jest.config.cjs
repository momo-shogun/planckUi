/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  testMatch: ['**/*.test.tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  // pnpm nests @react-native/* under .pnpm; allow Babel to transform Flow in those packages
  transformIgnorePatterns: [],
};
