import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  Text,
  View,
} from 'react-native';
import { getCheckboxTokens } from '@my-ui-lib/tokens';
import { useControlledState } from '../../hooks/useControlledState';
import { useReducedMotionRef } from '../../hooks/useReducedMotion';
import { useTheme } from '../../system/ThemeContext';
import { createCheckboxStyles } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

const SPRING = { friction: 8, tension: 100, useNativeDriver: true as const };

export function Checkbox(props: CheckboxProps) {
  const {
    checked: checkedProp,
    defaultChecked = false,
    onChange,
    label,
    description,
    disabled = false,
    indeterminate = false,
    size = 'md',
    unstyled = false,
    slots = {},
    testID,
    accessibilityLabel,
  } = props;
  const [checked, setChecked] = useControlledState(
    checkedProp,
    defaultChecked,
    onChange
  );
  const reduceMotion = useReducedMotionRef();
  const fillOp = useRef(new Animated.Value(checked || indeterminate ? 1 : 0)).current;
  const checkScale = useRef(
    new Animated.Value(checked && !indeterminate ? 1 : 0)
  ).current;

  useEffect(() => {
    const targetFill = checked || indeterminate ? 1 : 0;
    const targetScale = checked && !indeterminate ? 1 : 0;
    if (reduceMotion.current) {
      fillOp.setValue(targetFill);
      checkScale.setValue(targetScale);
      return;
    }
    fillOp.stopAnimation();
    checkScale.stopAnimation();
    Animated.parallel([
      Animated.timing(fillOp, {
        toValue: targetFill,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(checkScale, {
        toValue: targetScale,
        ...SPRING,
      }),
    ]).start();
  }, [checked, indeterminate, fillOp, checkScale, reduceMotion]);

  const toggle = () => {
    if (disabled) return;
    setChecked(!checked);
  };

  if (unstyled) {
    return (
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
        accessibilityLabel={accessibilityLabel ?? label}
        disabled={disabled}
        onPress={toggle}
        testID={testID}>
        {label ? <Text>{label}</Text> : null}
      </Pressable>
    );
  }

  const theme = useTheme();
  const tokens = getCheckboxTokens(theme);
  const styles = createCheckboxStyles(tokens, theme, size);

  const boxBorderColor = checked || indeterminate ? tokens.boxBorderChecked : tokens.boxBorder;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      onPress={toggle}
      style={[
        styles.pressable,
        disabled && { opacity: tokens.disabledOpacity },
        slots.root,
      ]}
      testID={testID}>
      <View
        style={[
          styles.boxOuter,
          {
            borderColor: boxBorderColor,
            backgroundColor: tokens.boxBg,
          },
          slots.box,
        ]}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.fillLayer,
            {
              backgroundColor: tokens.boxBgChecked,
              opacity: fillOp,
            },
          ]}
        />
        {indeterminate ? (
          <View
            style={[
              styles.indeterminateBar,
              { backgroundColor: tokens.checkmark },
            ]}
          />
        ) : (
          <Animated.View
            style={[
              styles.checkArea,
              {
                transform: [{ scale: checkScale }],
              },
              slots.checkmark,
            ]}>
            <View
              style={[styles.checkLeg1, { backgroundColor: tokens.checkmark }]}
            />
            <View
              style={[styles.checkLeg2, { backgroundColor: tokens.checkmark }]}
            />
          </Animated.View>
        )}
      </View>
      {label || description ? (
        <View style={styles.textCol}>
          {label ? (
            <Text style={[styles.label, slots.label]}>{label}</Text>
          ) : null}
          {description ? (
            <Text style={[styles.description, slots.description]}>
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}
