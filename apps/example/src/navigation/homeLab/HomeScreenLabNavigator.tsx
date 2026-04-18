import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeScreenLabStackParamList } from './types';
import { HomeMenuScreen } from '../../screens/homeLab/HomeMenuScreen';
import { ZeptoHSScreen } from '../../screens/homeLab/ZeptoHSScreen';

const Stack = createNativeStackNavigator<HomeScreenLabStackParamList>();

export function HomeScreenLabNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeMenu" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMenu" component={HomeMenuScreen} />
      <Stack.Screen name="ZeptoHS" component={ZeptoHSScreen} />
    </Stack.Navigator>
  );
}
