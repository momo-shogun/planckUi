import React, {useMemo} from 'react';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerContent, Text, useTheme} from '@my-ui-lib/core';
import {DRAWER_ITEMS, type DrawerRoute} from './drawerConstants';

function isDrawerRoute(key: string): key is DrawerRoute {
  return DRAWER_ITEMS.some((item) => item.key === key);
}

/**
 * Example shell around {@link DrawerContent}: wires navigation + brand header.
 * Visual spacing and list rows come only from `@my-ui-lib/core` + tokens; this file
 * only adds safe-area top inset (core stays free of safe-area-context).
 */
export function PlanckDrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const active = props.state.routeNames[props.state.index] as DrawerRoute;

  const slots = useMemo(
    () => ({
      root: {
        paddingTop: insets.top + theme.spacing[4],
      },
    }),
    [insets.top, theme],
  );

  const onItemPress = (key: string) => {
    if (isDrawerRoute(key)) {
      props.navigation.navigate(key);
    }
  };

  return (
    <DrawerContent
      items={DRAWER_ITEMS.map(({key, label}) => ({key, label}))}
      activeKey={active}
      slots={slots}
      onItemPress={onItemPress}
      header={
        <View>
          <Text variant="heading" style={{color: theme.colors.textPrimary}}>
            Planck UI
          </Text>
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            style={{
              marginTop: theme.spacing[2],
              fontSize: theme.fontSizes.md,
            }}>
            Component showcase
          </Text>
        </View>
      }
    />
  );
}
