import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type P = {color: string; size: number; focused: boolean};

function PlankHomeIcon({color, size, focused}: P) {
  return (
    <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
  );
}

function PlankSearchIcon({color, size, focused}: P) {
  return (
    <MaterialCommunityIcons
      name={focused ? 'magnify' : 'text-box-search-outline'}
      size={size}
      color={color}
    />
  );
}

function PlankChatIcon({color, size, focused}: P) {
  return (
    <MaterialCommunityIcons
      name={focused ? 'chat' : 'chat-outline'}
      size={size}
      color={color}
    />
  );
}

function PlankMenuIcon({color, size, focused}: P) {
  return (
    <MaterialCommunityIcons name={focused ? 'menu' : 'menu-open'} size={size} color={color} />
  );
}

export type PlankTabIconKind = 'home' | 'search' | 'chat' | 'menu';

export function rnPlankTabBarIcon(kind: PlankTabIconKind) {
  return ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
    switch (kind) {
      case 'home':
        return <PlankHomeIcon color={color} size={size} focused={focused} />;
      case 'search':
        return <PlankSearchIcon color={color} size={size} focused={focused} />;
      case 'chat':
        return <PlankChatIcon color={color} size={size} focused={focused} />;
      case 'menu':
        return <PlankMenuIcon color={color} size={size} focused={focused} />;
    }
  };
}
