/**
 * Link icon font files for react-native-vector-icons (bare React Native / CLI).
 * Run `pnpm link-assets` (from `apps/example`) after install or when fonts change.
 * @see https://github.com/oblador/react-native-vector-icons#installation
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    './node_modules/react-native-vector-icons/Fonts',
    './assets/fonts',
  ],
};
