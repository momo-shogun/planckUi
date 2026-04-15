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
  'react-native-vector-icons',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-screens',
  'react-native-safe-area-context',
  'react-native-svg',
]) {
  const dir = resolvePackageDir(name);
  if (dir) {
    try {
      extraNodeModules[name] = fs.realpathSync(dir);
    } catch {
      extraNodeModules[name] = dir;
    }
  }
}

/**
 * Metro's file map `exists()` can miss real files under pnpm's `.pnpm` tree even
 * when `extraNodeModules` points at the right folder. Resolve icon entry files
 * with Node so subpath imports like `react-native-vector-icons/MaterialCommunityIcons`
 * always map to a concrete path.
 */
/**
 * Metro does not apply `package.json` `exports` for arbitrary subpaths like
 * `@my-ui-lib/core/zepto-tabs`. Map it to the built file (or source fallback).
 */
function resolveMyUiLibCoreZeptoTabs() {
  const distJs = path.join(
    workspaceRoot,
    'packages',
    'core',
    'dist',
    'zepto-tabs.js',
  );
  if (fs.existsSync(distJs)) {
    try {
      return fs.realpathSync(distJs);
    } catch {
      return distJs;
    }
  }
  const srcEntry = path.join(
    workspaceRoot,
    'packages',
    'core',
    'src',
    'zepto-tabs.ts',
  );
  if (fs.existsSync(srcEntry)) {
    try {
      return fs.realpathSync(srcEntry);
    } catch {
      return srcEntry;
    }
  }
  return null;
}

function resolveReactNativeVectorIconsFile(moduleName) {
  if (!moduleName.startsWith('react-native-vector-icons/')) {
    return null;
  }
  const sub = moduleName.slice('react-native-vector-icons/'.length);
  if (!sub || sub.includes('..')) {
    return null;
  }
  let root;
  try {
    root = path.dirname(
      require.resolve('react-native-vector-icons/package.json', {
        paths: [__dirname],
      }),
    );
  } catch {
    return null;
  }
  const candidates = [
    path.join(root, `${sub}.js`),
    path.join(root, `${sub}.tsx`),
    path.join(root, `${sub}.ts`),
    path.join(root, sub),
  ];
  for (const fp of candidates) {
    try {
      const st = fs.statSync(fp);
      if (st.isFile()) {
        return fp;
      }
      if (st.isDirectory()) {
        const indexJs = path.join(fp, 'index.js');
        if (fs.existsSync(indexJs)) {
          return indexJs;
        }
      }
    } catch {
      // try next candidate
    }
  }
  return null;
}

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    // pnpm links deps through `node_modules/.pnpm/...`; Metro must follow symlinks.
    unstable_enableSymlinks: true,
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    ...(Object.keys(extraNodeModules).length > 0
      ? {extraNodeModules}
      : {}),
    resolveRequest(context, moduleName, platform) {
      if (moduleName === '@my-ui-lib/core/zepto-tabs') {
        const filePath = resolveMyUiLibCoreZeptoTabs();
        if (filePath) {
          return {type: 'sourceFile', filePath};
        }
      }
      const direct = resolveReactNativeVectorIconsFile(moduleName);
      if (direct) {
        return {type: 'sourceFile', filePath: direct};
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
