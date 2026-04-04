import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { getTabBarTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../../system/ThemeContext';
import { createTabBarStyles } from './TabBar.styles';
import type { TabBarProps } from './TabBar.types';

export function TabBar(props: TabBarProps) {
  const {
    items,
    activeKey,
    onChange,
    variant = 'default',
    unstyled = false,
    slots = {},
    testID,
  } = props;
  if (unstyled) {
    return (
      <View testID={testID}>
        {items.map((item) => (
          <Pressable key={item.key} onPress={() => onChange(item.key)}>
            {item.icon(item.key === activeKey)}
            <Text>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getTabBarTokens(theme, variant);
  const styles = createTabBarStyles(tokens, theme, variant);

  return (
    <View style={[styles.root, slots.root]} testID={testID}>
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(item.key)}
            style={[
              styles.item,
              active && styles.itemActive,
              slots.item,
              active && slots.itemActive,
            ]}>
            <View style={[styles.iconWrap, slots.iconWrap]}>
              {item.icon(active)}
            </View>
            <Text
              style={[
                styles.label,
                active && styles.labelActive,
                slots.label,
                active && slots.labelActive,
              ]}>
              {item.label}
            </Text>
            {active ? (
              <View style={[styles.indicator, slots.indicator]} />
            ) : (
              <View style={{ height: 3 }} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
