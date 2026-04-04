module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@my-ui-lib'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@my-ui-lib/no-hardcoded-colors': 'error',
  },
};
