import React from 'react';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabChatScreen} from '../../../../screens/bottomTabs/BottomTabChatScreen';
import {BottomTabHomeScreen} from '../../../../screens/bottomTabs/BottomTabHomeScreen';
import {BottomTabMenuScreen} from '../../../../screens/bottomTabs/BottomTabMenuScreen';
import {BottomTabSearchScreen} from '../../../../screens/bottomTabs/BottomTabSearchScreen';
import {PlanckBridgedTabBar} from '../../shared/PlanckBridgedTabBar';
import {rnPlankTabBarIcon} from './plankBarV1.icons';
import {plankBarV1TabNavigatorScreenOptions} from './plankBarV1.styles';
import type {PlankBarV1TabParamList} from './plankBarV1.types';

const PlankTab = createBottomTabNavigator<PlankBarV1TabParamList>();

export function PlankBarV1TabNavigator() {
  return (
    <PlankTab.Navigator
      screenOptions={plankBarV1TabNavigatorScreenOptions}
      tabBar={(props: BottomTabBarProps) => (
        <PlanckBridgedTabBar {...props} tabBarVariant="plankBarV1" />
      )}>
      <PlankTab.Screen
        name="Home"
        component={BottomTabHomeScreen}
        options={{title: 'Home', tabBarIcon: rnPlankTabBarIcon('home')}}
      />
      <PlankTab.Screen
        name="Search"
        component={BottomTabSearchScreen}
        options={{title: 'Search', tabBarIcon: rnPlankTabBarIcon('search')}}
      />
      <PlankTab.Screen
        name="Chat"
        component={BottomTabChatScreen}
        options={{title: 'Chat', tabBarIcon: rnPlankTabBarIcon('chat')}}
      />
      <PlankTab.Screen
        name="Menu"
        component={BottomTabMenuScreen}
        options={{title: 'Menu', tabBarIcon: rnPlankTabBarIcon('menu')}}
      />
    </PlankTab.Navigator>
  );
}
