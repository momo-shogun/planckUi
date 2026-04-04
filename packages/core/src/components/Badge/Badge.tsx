import React from 'react';
import { Text, View } from 'react-native';
import { getBadgeTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../system/ThemeContext';
import { createBadgeStyles } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export function Badge({
  label,
  intent = 'default',
  size = 'md',
  dot = false,
  unstyled = false,
  slots = {},
  testID,
  accessibilityLabel,
  accessibilityHint,
}: BadgeProps) {
  const a11y =
    accessibilityLabel ??
    (dot ? `${intent} indicator` : label) ??
    'badge';

  if (unstyled) {
    return (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={a11y}
        accessibilityHint={accessibilityHint}
        testID={testID}>
        {dot ? <View /> : label ? <Text>{label}</Text> : null}
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getBadgeTokens(theme, intent);
  const styles = createBadgeStyles(tokens, theme, size);

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={a11y}
      accessibilityHint={accessibilityHint}
      style={[styles.root, slots.root]}
      testID={testID}>
      {dot ? <View style={[styles.dot, slots.dot]} /> : null}
      {!dot && label ? (
        <Text style={[styles.label, slots.label]}>{label}</Text>
      ) : null}
    </View>
  );
}
