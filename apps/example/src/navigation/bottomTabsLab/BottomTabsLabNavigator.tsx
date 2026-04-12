import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabsMenuScreen} from '../../screens/bottomTabs/BottomTabsMenuScreen';
import {
  PresetActiveBackgroundTabs,
  PresetBadgesTabs,
  PresetBesideIconTabs,
  PresetDefaultTabs,
  PresetEagerTabs,
  PresetHideKeyboardTabs,
  PresetIconsOnlyTabs,
  PresetPlanckBarTabs,
  PresetPlankBarV1Tabs,
  PresetStyledBarTabs,
} from './BottomTabsLabPresets';
import type {BottomTabsLabStackParamList} from './types';

const Stack = createNativeStackNavigator<BottomTabsLabStackParamList>();

/**
 * Menu of React Navigation bottom-tab presets + nested tab navigators.
 * @see https://reactnavigation.org/docs/bottom-tab-navigator
 */
export function BottomTabsLabNavigator() {
  return (
    <Stack.Navigator initialRouteName="BottomTabsMenu" screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabsMenu" component={BottomTabsMenuScreen} />
      <Stack.Screen name="PresetDefault" component={PresetDefaultTabs} />
      <Stack.Screen name="PresetIconsOnly" component={PresetIconsOnlyTabs} />
      <Stack.Screen name="PresetBadges" component={PresetBadgesTabs} />
      <Stack.Screen name="PresetBesideIcon" component={PresetBesideIconTabs} />
      <Stack.Screen name="PresetStyledBar" component={PresetStyledBarTabs} />
      <Stack.Screen name="PresetActiveBackground" component={PresetActiveBackgroundTabs} />
      <Stack.Screen name="PresetHideKeyboard" component={PresetHideKeyboardTabs} />
      <Stack.Screen name="PresetEager" component={PresetEagerTabs} />
      <Stack.Screen name="PresetPlanckBar" component={PresetPlanckBarTabs} />
      <Stack.Screen name="PresetPlankBarV1" component={PresetPlankBarV1Tabs} />
    </Stack.Navigator>
  );
}
