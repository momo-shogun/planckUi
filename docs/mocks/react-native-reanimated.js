'use strict';

/**
 * Docs-only stub for Next.js / react-native-web previews.
 *
 * We only need Reanimated to *exist* so components can render. The real native
 * implementation relies on JSI/worklets and breaks SSR/bundling.
 */
const React = require('react');
const { View, ScrollView } = require('react-native-web');

/**
 * Minimal API surface used by `packages/core` ZeptoTabs.
 * Keep this tiny and add to it only when a docs preview needs more.
 */
function useSharedValue(initial) {
  // Local state bump ensures the owning component rerenders when `.value` changes,
  // without any global subscription loop.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, forceRender] = React.useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = React.useRef({ _value: initial });
  return {
    get value() {
      return ref.current._value;
    },
    set value(v) {
      ref.current._value = v;
      forceRender((x) => (x + 1) % 1000000);
    },
  };
}

function withTiming(toValue) {
  return toValue;
}

function useAnimatedStyle(factory) {
  return factory();
}

function interpolateColor(_value, _inputRange, outputRange) {
  if (!Array.isArray(outputRange)) return outputRange;
  const value = typeof _value === 'number' ? _value : 0;
  const inputRange = Array.isArray(_inputRange) ? _inputRange : [0];
  if (outputRange.length <= 1) return outputRange[0];

  // Find nearest stop (good enough for docs; no true interpolation).
  let bestIdx = 0;
  let bestDist = Infinity;
  for (let i = 0; i < inputRange.length; i += 1) {
    const d = Math.abs(value - (inputRange[i] ?? 0));
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return outputRange[bestIdx] ?? outputRange[0];
}

function createAnimatedComponent(Component) {
  return Component;
}

function useFrameCallback(_cb, _active = true) {
  // Docs web preview: no per-frame worklet runner (MarqueeButton / similar).
}

// Reanimated's default export behaves like a namespace and includes `.View`.
const AnimatedNamespace = {
  View,
  ScrollView,
  createAnimatedComponent,
};

module.exports = {
  __esModule: true,
  default: AnimatedNamespace,
  View,
  ScrollView,
  createAnimatedComponent,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useFrameCallback,
  interpolateColor,
  // Common no-op exports some libs probe for
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
};

