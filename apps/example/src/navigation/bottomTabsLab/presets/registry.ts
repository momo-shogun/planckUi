import type {ComponentType} from 'react';
import type {BottomTabsLabStackParamList} from '../types';
import type {BottomTabsLabPresetRouteKey} from './presetKeys';
import {PlankBarV1TabNavigator} from './plankBarV1/PlankBarV1TabNavigator';

export const bottomTabsLabPresets = [
  {
    routeKey: 'PresetPlankBarV1' satisfies BottomTabsLabPresetRouteKey,
    menuTitle: 'Plank Bar V1',
    menuSubtitle: 'Planck TabBar variant with dock-style icons.',
    drawerTitle: 'Plank Bar V1',
    Navigator: PlankBarV1TabNavigator satisfies ComponentType<Record<string, never>>,
  },
] as const;

export type BottomTabsLabMenuRow = {
  key: BottomTabsLabPresetRouteKey;
  title: string;
  subtitle: string;
};

export function bottomTabsLabMenuItems(): BottomTabsLabMenuRow[] {
  return bottomTabsLabPresets.map(p => ({
    key: p.routeKey,
    title: p.menuTitle,
    subtitle: p.menuSubtitle,
  }));
}

export function bottomTabsLabDrawerTitles(): Record<keyof BottomTabsLabStackParamList, string> {
  const presetTitles = Object.fromEntries(
    bottomTabsLabPresets.map(p => [p.routeKey, p.drawerTitle]),
  ) as Record<BottomTabsLabPresetRouteKey, string>;
  return {
    BottomTabsMenu: 'Bottom tabs lab',
    ...presetTitles,
  };
}
