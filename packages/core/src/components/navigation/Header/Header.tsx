import React from 'react';
import { Text, View } from 'react-native';
import { getHeaderTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../../system/ThemeContext';
import { createHeaderStyles } from './Header.styles';
import type { HeaderProps } from './Header.types';

export function Header({
  title,
  subtitle,
  left,
  right,
  variant = 'default',
  unstyled = false,
  slots = {},
  testID,
}: HeaderProps) {
  if (unstyled) {
    return (
      <View testID={testID}>
        {left}
        <Text>{title}</Text>
        {subtitle ? <Text>{subtitle}</Text> : null}
        {right}
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getHeaderTokens(theme, variant);
  const styles = createHeaderStyles(tokens, theme, variant);

  return (
    <View style={[styles.root, slots.root]} testID={testID}>
      <View style={[styles.side, slots.side]}>{left}</View>
      <View style={[styles.center, slots.center]}>
        <Text style={[styles.title, slots.title]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, slots.subtitle]}>{subtitle}</Text>
        ) : null}
      </View>
      <View style={[styles.side, styles.sideRight, slots.side]}>{right}</View>
    </View>
  );
}
