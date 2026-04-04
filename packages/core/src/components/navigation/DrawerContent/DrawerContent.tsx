import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { getDrawerContentTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../../system/ThemeContext';
import { createDrawerContentStyles } from './DrawerContent.styles';
import type { DrawerContentProps } from './DrawerContent.types';

export function DrawerContent(props: DrawerContentProps) {
  const {
    items,
    activeKey,
    onItemPress,
    header,
    footer,
    unstyled = false,
    slots = {},
    testID,
  } = props;

  if (unstyled) {
    return (
      <View testID={testID}>
        {header}
        {items.map((item) => (
          <Pressable key={item.key} onPress={() => onItemPress(item.key)}>
            {item.icon}
            <Text>{item.label}</Text>
          </Pressable>
        ))}
        {footer}
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getDrawerContentTokens(theme);
  const styles = createDrawerContentStyles(tokens, theme);

  return (
    <View style={[styles.root, slots.root]} testID={testID}>
      {header ? (
        <View style={[styles.header, slots.header]}>{header}</View>
      ) : null}

      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onItemPress(item.key)}
            style={[
              styles.item,
              active && styles.itemActive,
              slots.item,
              active && slots.itemActive,
            ]}>
            {/* Webflow-style left pill indicator */}
            {active ? <View style={styles.activeBar} /> : null}

            {/* Icon container – only rendered when item has an icon */}
            {item.icon ? (
              <View
                style={[
                  styles.iconContainer,
                  active && styles.iconContainerActive,
                  slots.iconContainer,
                  active && slots.iconContainerActive,
                ]}>
                {item.icon}
              </View>
            ) : null}

            <Text
              style={[
                styles.itemLabel,
                active && styles.itemLabelActive,
                slots.itemLabel,
                active && slots.itemLabelActive,
              ]}>
              {item.label}
            </Text>

            {item.badge != null ? (
              <View style={[styles.badge, slots.badge]}>
                <Text style={[styles.badgeText, slots.badgeText]}>
                  {item.badge}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}

      {footer ? (
        <View style={[styles.footer, slots.footer]}>{footer}</View>
      ) : null}
    </View>
  );
}
