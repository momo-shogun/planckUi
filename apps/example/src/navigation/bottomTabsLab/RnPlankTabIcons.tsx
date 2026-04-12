import React from 'react';
import {House, Menu, MessageCircle, Search} from 'lucide-react-native';

type P = {color: string; size: number};

const stroke = 2;

function PlankHomeIcon({color, size}: P) {
  return <House color={color} size={size} strokeWidth={stroke} />;
}

function PlankSearchIcon({color, size}: P) {
  return <Search color={color} size={size} strokeWidth={stroke} />;
}

function PlankChatIcon({color, size}: P) {
  return <MessageCircle color={color} size={size} strokeWidth={stroke} />;
}

function PlankMenuIcon({color, size}: P) {
  return <Menu color={color} size={size} strokeWidth={stroke} />;
}

export type PlankTabIconKind = 'home' | 'search' | 'chat' | 'menu';

export function rnPlankTabBarIcon(kind: PlankTabIconKind) {
  return ({color, size}: {focused: boolean; color: string; size: number}) => {
    switch (kind) {
      case 'home':
        return <PlankHomeIcon color={color} size={size} />;
      case 'search':
        return <PlankSearchIcon color={color} size={size} />;
      case 'chat':
        return <PlankChatIcon color={color} size={size} />;
      case 'menu':
        return <PlankMenuIcon color={color} size={size} />;
    }
  };
}
