const fs = require('fs');
const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const workspaceRoot = path.resolve(__dirname, '../..');

/**
 * pnpm often places deps in the workspace root; Metro sometimes fails to follow
 * symlinks when resolving from `index.js`. Pin critical native packages to a
 * real directory that contains package.json.
 */
function resolvePackageDir(packageName) {
  const candidates = [
    path.join(__dirname, 'node_modules', packageName),
    path.join(workspaceRoot, 'node_modules', packageName),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }
  }
  return null;
}

const extraNodeModules = {};
for (const name of [
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-screens',
  'react-native-safe-area-context',
  'react-native-svg',
  'lucide-react-native',
]) {
  const dir = resolvePackageDir(name);
  if (dir) {
    extraNodeModules[name] = dir;
  }
}

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    ...(Object.keys(extraNodeModules).length > 0
      ? {extraNodeModules}
      : {}),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
