import React, {
  isValidElement,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { getTabsTokens } from '@my-ui-lib/tokens';
import { useControlledState } from '../../hooks/useControlledState';
import { useReducedMotionRef } from '../../hooks/useReducedMotion';
import { useTheme } from '../../system/ThemeContext';
import { createTabsStyles } from './Tabs.styles';
import type { TabPanelProps, TabsProps } from './Tabs.types';

const SPRING = { friction: 8, tension: 100, useNativeDriver: false as const };

function extractPanel(
  children: TabsProps['children'],
  key: string
): React.ReactNode {
  let node: React.ReactNode = null;
  React.Children.forEach(children, (child) => {
    if (
      isValidElement<TabPanelProps>(child) &&
      child.type === TabPanel &&
      child.props.tabKey === key
    ) {
      node = child.props.children;
    }
  });
  return node;
}

export function TabPanel({ children }: TabPanelProps) {
  return <>{children}</>;
}
TabPanel.displayName = 'TabPanel';

export function Tabs({
  tabs,
  activeKey: activeKeyProp,
  defaultActiveKey,
  onChange,
  variant = 'underline',
  size = 'md',
  scrollable = false,
  children,
  unstyled = false,
  slots = {},
  testID,
}: TabsProps) {
  const first = tabs[0]?.key ?? '';
  const [activeKey, setActiveKey] = useControlledState(
    activeKeyProp,
    defaultActiveKey ?? first,
    onChange
  );
  const layouts = useRef<Record<string, { x: number; width: number }>>({});
  const animX = useRef(new Animated.Value(0)).current;
  const animW = useRef(new Animated.Value(0)).current;
  const reduceMotion = useReducedMotionRef();

  const syncIndicator = useCallback(
    (instant: boolean) => {
      const l = layouts.current[activeKey];
      if (!l) return;
      if (reduceMotion.current || instant) {
        animX.setValue(l.x);
        animW.setValue(l.width);
        return;
      }
      animX.stopAnimation();
      animW.stopAnimation();
      Animated.parallel([
        Animated.spring(animX, { toValue: l.x, ...SPRING }),
        Animated.spring(animW, { toValue: l.width, ...SPRING }),
      ]).start();
    },
    [activeKey, animX, animW, reduceMotion]
  );

  useEffect(() => {
    syncIndicator(false);
  }, [activeKey, syncIndicator, tabs]);

  const onTabLayout = (key: string) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    layouts.current[key] = { x, width };
    if (key === activeKey) {
      syncIndicator(true);
    }
  };

  if (unstyled) {
    return (
      <View testID={testID}>
        {tabs.map((t) => (
          <Pressable key={t.key} onPress={() => setActiveKey(t.key)}>
            <Text>{t.label}</Text>
          </Pressable>
        ))}
        <View>{extractPanel(children, activeKey)}</View>
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getTabsTokens(theme, variant);
  const styles = createTabsStyles(tokens, theme, size, variant);

  const indicatorStyle = [
    styles.indicator,
    variant === 'underline' && styles.indicatorUnderline,
    variant === 'pill' && {
      top: theme.spacing[1],
      bottom: theme.spacing[1],
      borderRadius: theme.radii.full,
      backgroundColor: tokens.tabBgActive,
    },
    variant === 'bordered' && {
      top: theme.spacing[1],
      bottom: theme.spacing[1],
      borderRadius: theme.radii.md,
      backgroundColor: tokens.tabBgActive,
    },
    {
      width: animW,
      transform: [{ translateX: animX }],
    },
    variant === 'underline' && {
      backgroundColor: tokens.indicatorColor,
    },
    slots.indicator,
  ];

  const tabButtons = tabs.map((t) => {
    const active = t.key === activeKey;
    return (
      <Pressable
        key={t.key}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        onPress={() => setActiveKey(t.key)}
        onLayout={onTabLayout(t.key)}
        style={[styles.tabPress, slots.tab]}>
        <View style={styles.tabInner}>
          <Text
            style={[
              styles.tabLabel,
              active && styles.tabLabelActive,
              slots.tabLabel,
            ]}>
            {t.label}
          </Text>
          {t.badge != null ? (
            <View style={[styles.badge, slots.tabBadge]}>
              <Text style={[styles.badgeText, slots.tabBadgeText]}>
                {t.badge > 99 ? '99+' : String(t.badge)}
              </Text>
            </View>
          ) : null}
        </View>
      </Pressable>
    );
  });

  const row = (
    <>
      <Animated.View style={indicatorStyle} />
      {tabButtons}
    </>
  );

  return (
    <View style={[styles.root, slots.root]} testID={testID}>
      <View style={[styles.tabBar, slots.tabBar]}>
        {scrollable ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabRow}>
            {row}
          </ScrollView>
        ) : (
          <View style={styles.tabRow}>{row}</View>
        )}
      </View>
      <View style={[styles.content, slots.content]}>
        {extractPanel(children, activeKey)}
      </View>
    </View>
  );
}
