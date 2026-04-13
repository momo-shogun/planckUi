import React from 'react';
import {View} from 'react-native';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import type {TabBarVariant} from '@my-ui-lib/tokens';
import {getPlankBarV1Chrome, getPlankBarV2Chrome} from '@my-ui-lib/tokens';
import {TabBar, useTheme} from '@my-ui-lib/core';

export type PlanckBridgedTabBarProps = BottomTabBarProps & {
  /** Planck `TabBar` visual variant (e.g. `plankBarV1` for the Plank Bar design). */
  tabBarVariant?: TabBarVariant;
};

/**
 * React Navigation custom tabBar using Planck TabBar (see RN bottom tabs docs).
 */
export function PlanckBridgedTabBar({
  state,
  descriptors,
  navigation,
  tabBarVariant = 'default',
}: PlanckBridgedTabBarProps) {
  const theme = useTheme();
  const plankV1Chrome = getPlankBarV1Chrome(theme);
  const plankV2Chrome = getPlankBarV2Chrome(theme);
  const activeName = state.routes[state.index]?.name;

  const items = state.routes.map(route => {
    const {options} = descriptors[route.key];
    const raw = options.tabBarLabel ?? options.title ?? route.name;
    const label = typeof raw === 'string' ? raw : route.name;
    return {
      key: route.name,
      label,
      icon: (active: boolean) => {
        const render = options.tabBarIcon;
        if (!render) {
          return <View style={{width: 22, height: 22}} />;
        }
        let color: string;
        if (tabBarVariant === 'plankBarV1') {
          color = active ? plankV1Chrome.activeFg : plankV1Chrome.inactiveIcon;
        } else if (tabBarVariant === 'plankBarV2') {
          color = active ? plankV2Chrome.activeFg : plankV2Chrome.inactiveIcon;
        } else {
          color = active ? theme.colors.primary : theme.colors.textSecondary;
        }
        return render({
          focused: active,
          color,
          size: 22,
        });
      },
    };
  });

  return (
    <TabBar
      variant={tabBarVariant}
      items={items}
      activeKey={activeName}
      onChange={key => {
        const route = state.routes.find(r => r.name === key);
        if (!route) {
          return;
        }
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      }}
    />
  );
}
