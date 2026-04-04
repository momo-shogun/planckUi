import React from 'react';
import { TextInput, View } from 'react-native';
import { getInputTokens } from '@my-ui-lib/tokens';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../system/ThemeContext';
import { useControlledState } from '../../hooks/useControlledState';
import { useFocusRing } from '../../hooks/useFocusRing';
import { createInputStyles } from './Input.styles';
import type { InputProps } from './Input.types';

export function Input({
  value: valueProp,
  defaultValue = '',
  onChangeText,
  placeholder,
  label,
  error,
  disabled = false,
  unstyled = false,
  slots = {},
  testID,
  accessibilityLabel,
  keyboardType,
}: InputProps) {
  const theme = useTheme();
  const tokens = getInputTokens(theme);
  const [value, setValue] = useControlledState(valueProp, defaultValue, onChangeText);
  const { isFocused, focusProps } = useFocusRing();
  const styles = createInputStyles(tokens, theme, isFocused, Boolean(error));

  if (unstyled) {
    return (
      <TextInput
        {...focusProps}
        editable={!disabled}
        keyboardType={keyboardType}
        placeholder={placeholder}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        value={value}
        onChangeText={setValue}
      />
    );
  }

  return (
    <View style={[styles.root, slots.root]} accessibilityLabel={accessibilityLabel}>
      {label ? (
        <Text style={[styles.label, slots.label]} variant="label">
          {label}
        </Text>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          {...focusProps}
          editable={!disabled}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={tokens.placeholder}
          style={[styles.inputText, slots.input]}
          testID={testID}
          value={value}
          onChangeText={setValue}
        />
      </View>
      {error ? (
        <Text style={[styles.errorText, slots.errorText]} variant="caption">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
