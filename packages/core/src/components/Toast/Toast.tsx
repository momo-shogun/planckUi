import React from 'react';
import { Animated, Text, View } from 'react-native';
import { getToastTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../system/ThemeContext';
import { createToastStyles } from './Toast.styles';
import type { ToastProps } from './Toast.types';

export function Toast({
  title,
  description,
  intent = 'default',
  progress,
  unstyled = false,
  slots = {},
  testID,
}: ToastProps) {
  if (unstyled) {
    return (
      <View testID={testID}>
        <Text>{title}</Text>
        {description ? <Text>{description}</Text> : null}
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getToastTokens(theme, intent);
  const styles = createToastStyles(tokens, theme);

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.root, slots.root]} testID={testID}>
      <Text style={[styles.title, slots.title]}>{title}</Text>
      {description ? (
        <Text style={[styles.description, slots.description]}>{description}</Text>
      ) : null}
      <View style={[styles.progressTrack, slots.progressTrack]}>
        <Animated.View
          style={[
            styles.progressFill,
            slots.progressFill,
            { width: fillWidth },
          ]}
        />
      </View>
    </View>
  );
}
