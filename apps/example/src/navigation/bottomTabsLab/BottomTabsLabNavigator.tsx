import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabsMenuScreen} from '../../screens/bottomTabs/BottomTabsMenuScreen';
import {bottomTabsLabPresets} from './presets/registry';
import type {BottomTabsLabStackParamList} from './types';

const Stack = createNativeStackNavigator<BottomTabsLabStackParamList>();

/**
 * Bottom tabs lab: stack screens are driven by `presets/registry.ts`.
 */
export function BottomTabsLabNavigator() {
  return (
    <Stack.Navigator initialRouteName="BottomTabsMenu" screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabsMenu" component={BottomTabsMenuScreen} />
      {bottomTabsLabPresets.map(p => (
        <Stack.Screen key={p.routeKey} name={p.routeKey} component={p.Navigator} />
      ))}
    </Stack.Navigator>
  );
}
