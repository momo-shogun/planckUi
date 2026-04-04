import React from 'react';
import { ActivityIndicator } from 'react-native';
import { getButtonTokens } from '@my-ui-lib/tokens';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../system/ThemeContext';
import { createButtonStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
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
      <Pressable disabled={disabled} onPress={onPress} testID={testID} accessibilityLabel={accessibilityLabel} {...rest}>
        {children}
      </Pressable>
    );
  }

  const theme = useTheme();
  const tokens = getButtonTokens(theme, variant);
  const styles = createButtonStyles(tokens, size, theme);

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      slots={{ root: slots.root ? [styles.root, slots.root] : styles.root }}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={tokens.text}
          style={[styles.loader, slots.loader]}
        />
      ) : typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[styles.text, slots.text]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
