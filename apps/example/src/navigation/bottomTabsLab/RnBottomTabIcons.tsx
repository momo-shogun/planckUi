import React from 'react';
import {View} from 'react-native';

type IconProps = {color: string; size: number};

/**
 * View-based tab icons for React Navigation (no vector font dependency).
 * RN passes `size` (~24); we honor it so icons are visible in the default tab bar.
 */
export function RnBottomTabHomeIcon({color, size}: IconProps) {
  const s = size;
  return (
    <View style={{width: s, height: s, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: s * 0.62,
          height: s * 0.5,
          borderWidth: 2,
          borderColor: color,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}
      />
    </View>
  );
}

export function RnBottomTabProfileIcon({color, size}: IconProps) {
  const r = size * 0.38;
  return (
    <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: r * 2,
          height: r * 2,
          borderRadius: r,
          borderWidth: 2,
          borderColor: color,
        }}
      />
    </View>
  );
}

export function RnBottomTabSettingsIcon({color, size}: IconProps) {
  const w = size * 0.65;
  const h = 2;
  const m = size * 0.12;
  return (
    <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: w, height: h, borderRadius: 1, backgroundColor: color}} />
      <View style={{width: w * 0.85, height: h, borderRadius: 1, backgroundColor: color, marginTop: m}} />
      <View style={{width: w * 0.7, height: h, borderRadius: 1, backgroundColor: color, marginTop: m}} />
    </View>
  );
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
