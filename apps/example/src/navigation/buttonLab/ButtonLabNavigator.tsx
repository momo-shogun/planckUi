import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ButtonLabStackParamList } from './types';
import { ButtonMenuScreen } from '../../screens/buttonLab/ButtonMenuScreen';
import { PillButtonV1Screen } from '../../screens/buttonLab/PillButtonV1Screen';
import { ButtonIconOnlyScreen } from '../../screens/buttonLab/ButtonIconOnlyScreen';
import { MarqueeButtonScreen } from '../../screens/buttonLab/MarqueeButtonScreen';

const Stack = createNativeStackNavigator<ButtonLabStackParamList>();

export function ButtonLabNavigator() {
  return (
    <Stack.Navigator initialRouteName="ButtonMenu" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ButtonMenu" component={ButtonMenuScreen} />
      <Stack.Screen name="PillButtonV1" component={PillButtonV1Screen} />
      <Stack.Screen name="ButtonIconOnly" component={ButtonIconOnlyScreen} />
      <Stack.Screen name="MarqueeButton" component={MarqueeButtonScreen} />
    </Stack.Navigator>
  );
}

