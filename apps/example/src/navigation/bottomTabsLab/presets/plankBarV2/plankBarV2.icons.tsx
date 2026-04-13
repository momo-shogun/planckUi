import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type P = {color: string; size: number; focused: boolean};

function V2HomeIcon({color, size, focused}: P) {
  return (
    <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
  );
}

function V2SearchIcon({color, size, focused}: P) {
  return (
    <MaterialCommunityIcons
      name={focused ? 'magnify' : 'text-box-search-outline'}
      size={size}
      color={color}
    />
  );
}

function V2ChatIcon({color, size, focused}: P) {
  return (
    <MaterialCommunityIcons
      name={focused ? 'chat' : 'chat-outline'}
      size={size}
      color={color}
    />
  );
}

function V2MenuIcon({color, size, focused}: P) {
  return (
    <MaterialCommunityIcons name={focused ? 'menu' : 'menu-open'} size={size} color={color} />
  );
}

export type PlankV2TabIconKind = 'home' | 'search' | 'chat' | 'menu';

export function rnPlankBarV2TabBarIcon(kind: PlankV2TabIconKind) {
  return ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
    switch (kind) {
      case 'home':
        return <V2HomeIcon color={color} size={size} focused={focused} />;
      case 'search':
        return <V2SearchIcon color={color} size={size} focused={focused} />;
      case 'chat':
        return <V2ChatIcon color={color} size={size} focused={focused} />;
      case 'menu':
        return <V2MenuIcon color={color} size={size} focused={focused} />;
    }
  };
}
