import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabsMenuScreen} from '../../screens/bottomTabs/BottomTabsMenuScreen';
import {PresetPlankBarV1Tabs} from './BottomTabsLabPresets';
import type {BottomTabsLabStackParamList} from './types';

const Stack = createNativeStackNavigator<BottomTabsLabStackParamList>();

/**
 * Bottom tabs lab: Plank Bar V1 demo (more presets can be added here later).
 */
export function BottomTabsLabNavigator() {
  return (
    <Stack.Navigator initialRouteName="BottomTabsMenu" screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabsMenu" component={BottomTabsMenuScreen} />
      <Stack.Screen name="PresetPlankBarV1" component={PresetPlankBarV1Tabs} />
    </Stack.Navigator>
  );
}
