import React from 'react';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabChatScreen} from '../../../../screens/bottomTabs/BottomTabChatScreen';
import {BottomTabHomeScreen} from '../../../../screens/bottomTabs/BottomTabHomeScreen';
import {BottomTabMenuScreen} from '../../../../screens/bottomTabs/BottomTabMenuScreen';
import {BottomTabSearchScreen} from '../../../../screens/bottomTabs/BottomTabSearchScreen';
import {PlanckBridgedTabBar} from '../../shared/PlanckBridgedTabBar';
import {rnPlankBarV2TabBarIcon} from './plankBarV2.icons';
import {plankBarV2TabNavigatorScreenOptions} from './plankBarV2.styles';
import type {PlankBarV2TabParamList} from './plankBarV2.types';

const PlankV2Tab = createBottomTabNavigator<PlankBarV2TabParamList>();

export function PlankBarV2TabNavigator() {
  return (
    <PlankV2Tab.Navigator
      screenOptions={plankBarV2TabNavigatorScreenOptions}
      tabBar={(props: BottomTabBarProps) => (
        <PlanckBridgedTabBar {...props} tabBarVariant="plankBarV2" />
      )}>
      <PlankV2Tab.Screen
        name="Home"
        component={BottomTabHomeScreen}
        options={{title: 'Home', tabBarIcon: rnPlankBarV2TabBarIcon('home')}}
      />
      <PlankV2Tab.Screen
        name="Search"
        component={BottomTabSearchScreen}
        options={{title: 'Search', tabBarIcon: rnPlankBarV2TabBarIcon('search')}}
      />
      <PlankV2Tab.Screen
        name="Chat"
        component={BottomTabChatScreen}
        options={{title: 'Chat', tabBarIcon: rnPlankBarV2TabBarIcon('chat')}}
      />
      <PlankV2Tab.Screen
        name="Menu"
        component={BottomTabMenuScreen}
        options={{title: 'Menu', tabBarIcon: rnPlankBarV2TabBarIcon('menu')}}
      />
    </PlankV2Tab.Navigator>
  );
}
