module.exports = {
  root: true,
  extends: ['@my-ui-lib/eslint-config'],
  ignorePatterns: ['dist/'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: null,
  },
};
