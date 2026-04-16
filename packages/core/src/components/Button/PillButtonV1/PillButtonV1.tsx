import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';
import { Text } from '../../../primitives/Text';
import { Pressable } from '../../../primitives/Pressable';
import { useTheme } from '../../../system/ThemeContext';
import { createPillButtonV1Styles } from './PillButtonV1.styles';
import type { PillButtonV1Props } from './PillButtonV1.types';

const DEFAULT_BG = ['#0b0b0d', '#0b0b0d'] as const;

export function PillButtonV1(props: PillButtonV1Props) {
  const {
    backgroundGradientColors = DEFAULT_BG,
    textColor = '#ffffff',
    disabled = false,
    loading = false,
    unstyled = false,
    slots = {},
    onPress,
    children,
    testID,
    accessibilityLabel,
    ...rest
  } = props;

  if (unstyled) {
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        {...rest}
      >
        {children}
      </Pressable>
    );
  }

  const theme = useTheme();
  const styles = createPillButtonV1Styles(theme);

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      slots={{ root: slots.root ? [styles.root, slots.root] : styles.root }}
      {...rest}
    >
      <View style={styles.gradientContainer} pointerEvents="none">
        <Svg width="100%" height="100%" style={styles.gradientSvg}>
          <Defs>
            <SvgLinearGradient id="pillButtonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={backgroundGradientColors[0]} stopOpacity="1" />
              <Stop offset="100%" stopColor={backgroundGradientColors[1]} stopOpacity="1" />
            </SvgLinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#pillButtonGradient)" />
        </Svg>
      </View>

      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[styles.text, { color: textColor }, slots.text]}>{children}</Text>
      ) : (
        children
      )}

      {disabled ? <View pointerEvents="none" style={styles.disabledOverlay} /> : null}
    </Pressable>
  );
}

