import type {NavigationProp, RouteProp} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import type {RootDrawerParamList} from '../drawerConstants';
import {DrawerMenuButton} from '../DrawerMenuButton';
import type {BottomTabsLabStackParamList} from './types';

const TITLES: Record<keyof BottomTabsLabStackParamList, string> = {
  BottomTabsMenu: 'Bottom tabs lab',
  PresetDefault: 'Default',
  PresetIconsOnly: 'Icons only',
  PresetBadges: 'Badges',
  PresetBesideIcon: 'Label beside icon',
  PresetStyledBar: 'Styled bar',
  PresetActiveBackground: 'Active background',
  PresetHideKeyboard: 'Hide with keyboard',
  PresetEager: 'Eager tabs',
  PresetPlanckBar: 'Planck tabBar',
  PresetPlankBarV1: 'Plank Bar V1',
};

export function bottomTabsLabDrawerTitle(
  route: RouteProp<RootDrawerParamList, 'BottomTabsLab'>,
): string {
  const focused = getFocusedRouteNameFromRoute(route) as keyof BottomTabsLabStackParamList | undefined;
  if (focused && focused in TITLES) {
    return TITLES[focused];
  }
  return TITLES.BottomTabsMenu;
}

type DrawerNav = NavigationProp<RootDrawerParamList>;

export function BottomTabsLabDrawerHeaderLeft({
  route,
  navigation,
  barColor,
}: {
  route: RouteProp<RootDrawerParamList, 'BottomTabsLab'>;
  navigation: DrawerNav;
  barColor: string;
}) {
  const focused = getFocusedRouteNameFromRoute(route) ?? 'BottomTabsMenu';
  const showBack = focused !== 'BottomTabsMenu';

  if (showBack) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back to bottom tabs menu"
        hitSlop={{top: 12, bottom: 12, left: 8, right: 8}}
        onPress={() => {
          navigation.navigate('BottomTabsLab', {screen: 'BottomTabsMenu'});
        }}
        style={styles.backHit}>
        <Text style={[styles.backGlyph, {color: barColor}]}>‹</Text>
      </Pressable>
    );
  }

  return <DrawerMenuButton barColor={barColor} />;
}

const styles = StyleSheet.create({
  backHit: {
    marginLeft: 0,
    paddingVertical: 10,
    paddingRight: 4,
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
  },
  backGlyph: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '300',
    marginTop: -4,
  },
});
