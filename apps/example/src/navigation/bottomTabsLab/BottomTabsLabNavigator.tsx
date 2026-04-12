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
    <Stack.Navigator initialRouteName="BottomTabsMenu">
      <Stack.Screen
        name="BottomTabsMenu"
        component={BottomTabsMenuScreen}
        options={{title: 'Bottom tabs (RN)', headerShown: false}}
      />
      <Stack.Screen name="PresetDefault" component={PresetDefaultTabs} options={{title: 'Default'}} />
      <Stack.Screen name="PresetIconsOnly" component={PresetIconsOnlyTabs} options={{title: 'Icons only'}} />
      <Stack.Screen name="PresetBadges" component={PresetBadgesTabs} options={{title: 'Badges'}} />
      <Stack.Screen
        name="PresetBesideIcon"
        component={PresetBesideIconTabs}
        options={{title: 'Label beside icon'}}
      />
      <Stack.Screen name="PresetStyledBar" component={PresetStyledBarTabs} options={{title: 'Styled bar'}} />
      <Stack.Screen
        name="PresetActiveBackground"
        component={PresetActiveBackgroundTabs}
        options={{title: 'Active background'}}
      />
      <Stack.Screen
        name="PresetHideKeyboard"
        component={PresetHideKeyboardTabs}
        options={{title: 'Hide with keyboard'}}
      />
      <Stack.Screen name="PresetEager" component={PresetEagerTabs} options={{title: 'Eager tabs'}} />
      <Stack.Screen name="PresetPlanckBar" component={PresetPlanckBarTabs} options={{title: 'Planck tabBar'}} />
      <Stack.Screen
        name="PresetPlankBarV1"
        component={PresetPlankBarV1Tabs}
        options={{title: 'Plank Bar V1', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
