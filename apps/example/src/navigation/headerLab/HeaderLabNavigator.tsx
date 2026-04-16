import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HeaderLabStackParamList } from './types';
import { HeaderMenuScreen } from '../../screens/headerLab/HeaderMenuScreen';
import { PlanckH1V1HeaderScreen } from '../../screens/headerLab/PlanckH1V1HeaderScreen';

const Stack = createNativeStackNavigator<HeaderLabStackParamList>();

export function HeaderLabNavigator() {
  return (
    <Stack.Navigator initialRouteName="HeaderMenu" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HeaderMenu" component={HeaderMenuScreen} />
      <Stack.Screen name="PlanckH1V1" component={PlanckH1V1HeaderScreen} />
    </Stack.Navigator>
  );
}

