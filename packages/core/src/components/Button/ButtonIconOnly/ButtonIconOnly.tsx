import React from 'react';
import type { ViewStyle } from 'react-native';
import { Pressable } from '../../../primitives/Pressable';
import { useTheme } from '../../../system/ThemeContext';
import { createButtonIconOnlyStyles } from './ButtonIconOnly.styles';
import type { ButtonIconOnlyProps } from './ButtonIconOnly.types';

export function ButtonIconOnly(props: ButtonIconOnlyProps) {
  const {
    icon,
    onPress,
    disabled = false,
    variant = 'ghost',
    size = 'md',
    active = false,
    backgroundColor,
    pressedBackgroundColor,
    activeBackgroundColor,
    unstyled = false,
    slots = {},
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
        {icon}
      </Pressable>
    );
  }

  const theme = useTheme();
  const styles = createButtonIconOnlyStyles(theme, { size, variant });

  const fallback = (() => {
    if (variant === 'solid') return 'rgba(255,255,255,0.16)';
    return 'rgba(255,255,255,0.14)';
  })();

  const resolvedPressedBg = pressedBackgroundColor ?? fallback;
  const resolvedActiveBg = activeBackgroundColor ?? fallback;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      slots={{ root: slots.root ? [styles.root, slots.root] : styles.root }}
      style={({ pressed }) => {
        const bgColor = active
          ? resolvedActiveBg
          : pressed
            ? resolvedPressedBg
            : backgroundColor;

        const bg: ViewStyle | undefined = bgColor ? { backgroundColor: bgColor } : undefined;
        return bg;
      }}
      {...rest}
    >
      {icon}
    </Pressable>
  );
}

