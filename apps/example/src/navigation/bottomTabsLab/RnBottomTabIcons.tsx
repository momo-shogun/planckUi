import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {color: string; size: number; focused: boolean};

export function RnBottomTabHomeIcon({color, size, focused}: IconProps) {
  return (
    <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
  );
}

export function RnBottomTabProfileIcon({color, size, focused}: IconProps) {
  return (
    <MaterialCommunityIcons
      name={focused ? 'account' : 'account-outline'}
      color={color}
      size={size}
    />
  );
}

export function RnBottomTabSettingsIcon({color, size, focused}: IconProps) {
  return (
    <MaterialCommunityIcons name={focused ? 'cog' : 'cog-outline'} color={color} size={size} />
  );
}

export function rnTabBarIcon(route: 'Home' | 'Profile' | 'Settings') {
  return ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
    switch (route) {
      case 'Home':
        return <RnBottomTabHomeIcon color={color} size={size} focused={focused} />;
      case 'Profile':
        return <RnBottomTabProfileIcon color={color} size={size} focused={focused} />;
      case 'Settings':
        return <RnBottomTabSettingsIcon color={color} size={size} focused={focused} />;
    }
  };
}
