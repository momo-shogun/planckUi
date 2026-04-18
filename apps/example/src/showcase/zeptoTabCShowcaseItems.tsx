import React from 'react';
import type { ZeptoTabCItem } from '@my-ui-lib/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ICON_COLOR = '#141414';
const ICON_SIZE = 24;

/** Shared ZeptoTabC demo tabs (MaterialCommunityIcons) for Tabs lab + HomeScreen showcase. */
export function getZeptoTabCShowcaseItems(): ZeptoTabCItem[] {
  return [
    {
      id: 'all',
      label: 'All',
      icon: (
        <MaterialCommunityIcons name="shopping" size={ICON_SIZE} color={ICON_COLOR} />
      ),
    },
    {
      id: 'night',
      label: 'Night Store',
      icon: (
        <MaterialCommunityIcons name="ice-cream" size={ICON_SIZE} color={ICON_COLOR} />
      ),
    },
    {
      id: 'electronics',
      label: 'Electronics',
      icon: (
        <MaterialCommunityIcons name="headphones" size={ICON_SIZE} color={ICON_COLOR} />
      ),
      badge: { text: 'NEW', variant: 'new' },
    },
    {
      id: 'fashion',
      label: 'Fashion',
      icon: (
        <MaterialCommunityIcons
          name="tshirt-crew-outline"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      badge: { text: 'SALE', variant: 'sale' },
    },
    {
      id: 'beauty',
      label: 'Beauty',
      icon: (
        <MaterialCommunityIcons name="lipstick" size={ICON_SIZE} color={ICON_COLOR} />
      ),
    },
  ];
}
