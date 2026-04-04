import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabHomeScreen} from '../screens/bottomTabs/BottomTabHomeScreen';
import {BottomTabProfileScreen} from '../screens/bottomTabs/BottomTabProfileScreen';
import {BottomTabSettingsScreen} from '../screens/bottomTabs/BottomTabSettingsScreen';

export type BottomTabsLabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsLabParamList>();

/**
 * Nested bottom tab navigator (React Navigation), opened from the root drawer.
 * @see https://reactnavigation.org/docs/bottom-tab-navigator
 */
export function BottomTabsLabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={BottomTabHomeScreen} options={{title: 'Home'}} />
      <Tab.Screen name="Profile" component={BottomTabProfileScreen} options={{title: 'Profile'}} />
      <Tab.Screen
        name="Settings"
        component={BottomTabSettingsScreen}
        options={{title: 'Settings'}}
      />
    </Tab.Navigator>
  );
}
