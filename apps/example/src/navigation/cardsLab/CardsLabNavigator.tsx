import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CardsLabStackParamList } from './types';
import { CardsMenuScreen } from '../../screens/cardsLab/CardsMenuScreen';
import { MPCardScreen } from '../../screens/cardsLab/MPCardScreen';
import { CoffeeInviteCardScreen } from '../../screens/cardsLab/CoffeeInviteCardScreen';

const Stack = createNativeStackNavigator<CardsLabStackParamList>();

export function CardsLabNavigator() {
  return (
    <Stack.Navigator initialRouteName="CardsMenu" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CardsMenu" component={CardsMenuScreen} />
      <Stack.Screen name="MPCard" component={MPCardScreen} />
      <Stack.Screen name="CoffeeInviteCard" component={CoffeeInviteCardScreen} />
    </Stack.Navigator>
  );
}

