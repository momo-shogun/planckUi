import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/zepto-tabs.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-native', 'react-native-reanimated'],
  treeshake: true,
});
