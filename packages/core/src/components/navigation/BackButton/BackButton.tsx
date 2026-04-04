import React from 'react';
import { Pressable, View } from 'react-native';
import { getHeaderTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../../system/ThemeContext';
import { createBackButtonStyles } from './BackButton.styles';
import type { BackButtonProps } from './BackButton.types';

export function BackButton({
  onPress,
  variant = 'default',
  unstyled = false,
  slots = {},
  testID,
}: BackButtonProps) {
  if (unstyled) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onPress}
        testID={testID}>
        <View />
      </Pressable>
    );
  }

  const theme = useTheme();
  const tokens = getHeaderTokens(theme, variant);
  const styles = createBackButtonStyles(tokens, theme);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={onPress}
      style={[styles.root, slots.root]}
      testID={testID}>
      <View style={[styles.chevron, slots.chevron]}>
        <View style={[styles.arm, styles.armUp]} />
        <View style={[styles.arm, styles.armDown]} />
      </View>
    </Pressable>
  );
}
