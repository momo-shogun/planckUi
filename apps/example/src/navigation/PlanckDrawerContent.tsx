import React, {useMemo} from 'react';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Avatar, DrawerContent, Text, useTheme} from '@my-ui-lib/core';
import {colorWithOpacity} from '@my-ui-lib/tokens';
import {type DrawerItem} from '@my-ui-lib/core';
import {DRAWER_ITEMS, type DrawerRoute} from './drawerConstants';
import {
  BottomTabsIcon,
  GridIcon,
  ModalIcon,
  SheetIcon,
  TabsIcon,
  ToastIcon,
} from './NavIcons';

// ─── Helpers ────────────────────────────────────────────────────────────────

function isDrawerRoute(key: string): key is DrawerRoute {
  return DRAWER_ITEMS.some((item) => item.key === key);
}

/**
 * Returns a View-based icon for each route. The icon receives the active color
 * so tinting is driven by DrawerContent's token system.
 */
function iconForRoute(key: DrawerRoute, color: string): React.ReactNode {
  switch (key) {
    case 'Showcase':    return <GridIcon  color={color} size={16} />;
    case 'ModalLab':    return <ModalIcon color={color} size={16} />;
    case 'SheetLab':    return <SheetIcon color={color} size={16} />;
    case 'ToastLab':    return <ToastIcon color={color} size={16} />;
    case 'TabsLab':        return <TabsIcon       color={color} size={16} />;
    case 'BottomTabsLab':  return <BottomTabsIcon color={color} size={16} />;
  }
}

// ─── Drawer brand header ────────────────────────────────────────────────────

function DrawerHeader() {
  const theme = useTheme();
  return (
    <View>
      <Text
        variant="heading"
        style={{color: theme.colors.textPrimary, fontSize: theme.fontSizes.xl}}>
        Planck UI
      </Text>
      <Text
        variant="caption"
        color={theme.colors.textSecondary}
        style={{marginTop: theme.spacing[1], fontSize: theme.fontSizes.sm}}>
        Component showcase
      </Text>
    </View>
  );
}

// ─── Drawer footer (user profile card) ──────────────────────────────────────

function DrawerFooter() {
  const theme = useTheme();

  const cardStyle = useMemo(
    () => ({
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: theme.spacing[3],
      padding: theme.spacing[3],
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surfaceRaised,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
    }),
    [theme],
  );

  const nameStyle = useMemo(
    () => ({
      fontSize: theme.fontSizes.md,
      fontWeight: theme.fontWeights.semibold as '600',
      color: theme.colors.textPrimary,
    }),
    [theme],
  );

  const roleStyle = useMemo(
    () => ({
      fontSize: theme.fontSizes.xs,
      color: theme.colors.textSecondary,
      marginTop: 2,
    }),
    [theme],
  );

  return (
    <View>
      <Text
        variant="caption"
        color={theme.colors.textSecondary}
        style={{
          marginBottom: theme.spacing[2],
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.fontWeights.semibold as '600',
          letterSpacing: 0.8,
        }}>
        YOUR ACCOUNT
      </Text>
      <View style={cardStyle}>
        <Avatar fallback="Dev User" size="sm" variant="circle" />
        <View style={{flex: 1}}>
          <Text style={nameStyle}>Dev User</Text>
          <Text style={roleStyle}>dev@planckui.com</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

/**
 * Example shell around {@link DrawerContent}: wires navigation, injects icons,
 * and adds safe-area top padding.
 *
 * Visual spacing, row styles, and active pill come only from
 * `@my-ui-lib/core` + tokens — this file adds only:
 *   1. Safe-area top inset (core stays free of safe-area-context).
 *   2. Route-specific icons via `DrawerItem.icon`.
 *   3. User-profile footer card.
 */
export function PlanckDrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const active = props.state.routeNames[props.state.index] as DrawerRoute;

  // Safe-area: only override root top padding; everything else comes from core.
  const slots = useMemo(
    () => ({
      root: {paddingTop: insets.top + theme.spacing[3]},
    }),
    [insets.top, theme.spacing],
  );

  // Build items with icons — icon tint is inactive by default;
  // DrawerContent applies iconContainerActive style when active.
  const items: DrawerItem[] = useMemo(
    () =>
      DRAWER_ITEMS.map(({key, label}) => ({
        key,
        label,
        icon: iconForRoute(key as DrawerRoute, colorWithOpacity(theme.colors.textSecondary, 0.9)),
      })),
    [theme.colors.textSecondary],
  );

  const onItemPress = (key: string) => {
    if (isDrawerRoute(key)) {
      props.navigation.navigate(key);
    }
  };

  return (
    <DrawerContent
      items={items}
      activeKey={active}
      slots={slots}
      onItemPress={onItemPress}
      header={<DrawerHeader />}
      footer={<DrawerFooter />}
    />
  );
}
