import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/zepto-tabs.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  // When building in watch mode, `clean: true` temporarily deletes `dist/`,
  // and Next.js (docs) can crash mid-request with "Failed to read source code"
  // and then a corrupted webpack runtime ("__webpack_modules__[moduleId] is not a function").
  clean: !process.env.TSUP_WATCH,
  sourcemap: true,
  external: ['react', 'react-native', 'react-native-reanimated'],
  treeshake: true,
});
