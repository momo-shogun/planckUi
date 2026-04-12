import React from 'react';
import {Cog, House, UserRound} from 'lucide-react-native';

type IconProps = {color: string; size: number};

const stroke = 2;

export function RnBottomTabHomeIcon({color, size}: IconProps) {
  return <House color={color} size={size} strokeWidth={stroke} />;
}

export function RnBottomTabProfileIcon({color, size}: IconProps) {
  return <UserRound color={color} size={size} strokeWidth={stroke} />;
}

export function RnBottomTabSettingsIcon({color, size}: IconProps) {
  return <Cog color={color} size={size} strokeWidth={stroke} />;
}

export function rnTabBarIcon(route: 'Home' | 'Profile' | 'Settings') {
  return ({color, size}: {focused: boolean; color: string; size: number}) => {
    switch (route) {
      case 'Home':
        return <RnBottomTabHomeIcon color={color} size={size} />;
      case 'Profile':
        return <RnBottomTabProfileIcon color={color} size={size} />;
      case 'Settings':
        return <RnBottomTabSettingsIcon color={color} size={size} />;
    }
  };
}
