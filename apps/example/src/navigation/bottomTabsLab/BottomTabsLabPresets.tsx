import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colorWithOpacity} from '@my-ui-lib/tokens';
import {useTheme} from '@my-ui-lib/core';
import {BottomTabChatScreen} from '../../screens/bottomTabs/BottomTabChatScreen';
import {BottomTabHomeScreen} from '../../screens/bottomTabs/BottomTabHomeScreen';
import {BottomTabMenuScreen} from '../../screens/bottomTabs/BottomTabMenuScreen';
import {BottomTabProfileScreen} from '../../screens/bottomTabs/BottomTabProfileScreen';
import {BottomTabSearchScreen} from '../../screens/bottomTabs/BottomTabSearchScreen';
import {BottomTabSettingsScreen} from '../../screens/bottomTabs/BottomTabSettingsScreen';
import {PlanckBridgedTabBar} from './PlanckBridgedTabBar';
import {rnTabBarIcon} from './RnBottomTabIcons';
import {rnPlankTabBarIcon} from './RnPlankTabIcons';
import type {BottomTabsLabParamList, PlankBarV1TabParamList} from './types';

const Tab = createBottomTabNavigator<BottomTabsLabParamList>();

const PlankTab = createBottomTabNavigator<PlankBarV1TabParamList>();

function tripletScreens(props: {
  profileBadge?: number | string;
  settingsBadge?: number | string;
  perScreenLazy?: boolean;
}) {
  const {profileBadge, settingsBadge, perScreenLazy} = props;
  return [
    <Tab.Screen
      key="Home"
      name="Home"
      component={BottomTabHomeScreen}
      options={{
        title: 'Home',
        tabBarIcon: rnTabBarIcon('Home'),
        ...(perScreenLazy === false ? {lazy: false} : {}),
      }}
    />,
    <Tab.Screen
      key="Profile"
      name="Profile"
      component={BottomTabProfileScreen}
      options={{
        title: 'Profile',
        tabBarIcon: rnTabBarIcon('Profile'),
        ...(profileBadge !== undefined ? {tabBarBadge: profileBadge} : {}),
        ...(perScreenLazy === false ? {lazy: false} : {}),
      }}
    />,
    <Tab.Screen
      key="Settings"
      name="Settings"
      component={BottomTabSettingsScreen}
      options={{
        title: 'Settings',
        tabBarIcon: rnTabBarIcon('Settings'),
        ...(settingsBadge !== undefined ? {tabBarBadge: settingsBadge} : {}),
        ...(perScreenLazy === false ? {lazy: false} : {}),
      }}
    />,
  ];
}

export function PresetDefaultTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}>
      {tripletScreens({})}
    </Tab.Navigator>
  );
}

export function PresetIconsOnlyTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}>
      {tripletScreens({})}
    </Tab.Navigator>
  );
}

export function PresetBadgesTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}>
      {tripletScreens({profileBadge: 3, settingsBadge: '!'})}
    </Tab.Navigator>
  );
}

export function PresetBesideIconTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}>
      {tripletScreens({})}
    </Tab.Navigator>
  );
}

export function PresetStyledBarTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.colors.border,
          height: 64,
        },
      }}>
      {tripletScreens({})}
    </Tab.Navigator>
  );
}

export function PresetActiveBackgroundTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarActiveBackgroundColor: colorWithOpacity(theme.colors.primary, 0.12),
        tabBarInactiveBackgroundColor: 'transparent',
      }}>
      {tripletScreens({})}
    </Tab.Navigator>
  );
}

export function PresetHideKeyboardTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}>
      {tripletScreens({})}
    </Tab.Navigator>
  );
}

export function PresetEagerTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}>
      {tripletScreens({perScreenLazy: false})}
    </Tab.Navigator>
  );
}

export function PresetPlanckBarTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={props => <PlanckBridgedTabBar {...props} />}>
      {tripletScreens({})}
    </Tab.Navigator>
  );
}

export function PresetPlankBarV1Tabs() {
  return (
    <PlankTab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <PlanckBridgedTabBar {...props} tabBarVariant="plankBarV1" />}>
      <PlankTab.Screen
        name="Home"
        component={BottomTabHomeScreen}
        options={{title: 'Home', tabBarIcon: rnPlankTabBarIcon('home')}}
      />
      <PlankTab.Screen
        name="Search"
        component={BottomTabSearchScreen}
        options={{title: 'Search', tabBarIcon: rnPlankTabBarIcon('search')}}
      />
      <PlankTab.Screen
        name="Chat"
        component={BottomTabChatScreen}
        options={{title: 'Chat', tabBarIcon: rnPlankTabBarIcon('chat')}}
      />
      <PlankTab.Screen
        name="Menu"
        component={BottomTabMenuScreen}
        options={{title: 'Menu', tabBarIcon: rnPlankTabBarIcon('menu')}}
      />
    </PlankTab.Navigator>
  );
}
