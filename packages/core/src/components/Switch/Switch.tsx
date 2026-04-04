import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { getSwitchTokens } from '@my-ui-lib/tokens';
import { useControlledState } from '../../hooks/useControlledState';
import { useReducedMotionRef } from '../../hooks/useReducedMotion';
import { useTheme } from '../../system/ThemeContext';
import { SWITCH_GEOM, createSwitchStyles } from './Switch.styles';
import type { SwitchProps } from './Switch.types';

export function Switch({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  unstyled = false,
  slots = {},
  testID,
  accessibilityLabel,
}: SwitchProps) {
  const [checked, setChecked] = useControlledState(
    checkedProp,
    defaultChecked,
    onChange
  );
  const reduceMotion = useReducedMotionRef();
  const progress = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const trackCheckedOp = useRef(new Animated.Value(checked ? 1 : 0)).current;

  const { trackW, thumb } = SWITCH_GEOM[size];
  const pad = 2;
  const travel = trackW - thumb - pad * 2;

  useEffect(() => {
    const to = checked ? 1 : 0;
    if (reduceMotion.current) {
      progress.setValue(to);
      trackCheckedOp.setValue(to);
      return;
    }
    progress.stopAnimation();
    trackCheckedOp.stopAnimation();
    Animated.parallel([
      Animated.spring(progress, {
        toValue: to,
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(trackCheckedOp, {
        toValue: to,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checked, progress, trackCheckedOp, reduceMotion]);

  const thumbTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, travel],
  });

  const toggle = () => {
    if (disabled) return;
    setChecked(!checked);
  };

  if (unstyled) {
    return (
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={accessibilityLabel ?? label}
        disabled={disabled}
        onPress={toggle}
        testID={testID}>
        {label ? <Text>{label}</Text> : null}
      </Pressable>
    );
  }

  const theme = useTheme();
  const tokens = getSwitchTokens(theme);
  const styles = createSwitchStyles(tokens, theme, size);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      onPress={toggle}
      style={[styles.root, disabled && { opacity: 0.5 }, slots.root]}
      testID={testID}>
      <View style={[styles.track, slots.track]}>
        <View
          style={[
            styles.trackLayer,
            { backgroundColor: tokens.trackBg },
          ]}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            styles.trackLayer,
            {
              backgroundColor: tokens.trackBgChecked,
              opacity: trackCheckedOp,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbTranslate }],
            },
            slots.thumb,
          ]}
        />
      </View>
      {label ? <Text style={[styles.label, slots.label]}>{label}</Text> : null}
    </Pressable>
  );
}
