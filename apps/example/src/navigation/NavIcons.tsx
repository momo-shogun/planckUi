/**
 * Drawer icons via **react-native-vector-icons** (MaterialCommunityIcons) — standard for RN CLI
 * (no Expo native modules such as ExpoFontLoader).
 */
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {color: string; size?: number};

/** 2×2 grid — "Showcase / Overview" */
export function GridIcon({color, size = 16}: IconProps) {
  return <MaterialCommunityIcons name="view-grid-outline" color={color} size={size} />;
}

/** Window — "Modal" */
export function ModalIcon({color, size = 16}: IconProps) {
  return <MaterialCommunityIcons name="window-maximize" color={color} size={size} />;
}

/** Panel from bottom — "Bottom sheet" */
export function SheetIcon({color, size = 16}: IconProps) {
  return <MaterialCommunityIcons name="arrow-collapse-up" color={color} size={size} />;
}

/** Bell — "Toasts" / notifications */
export function ToastIcon({color, size = 16}: IconProps) {
  return <MaterialCommunityIcons name="bell-outline" color={color} size={size} />;
}

/** Composite layout — React Navigation bottom tabs */
export function BottomTabsIcon({color, size = 16}: IconProps) {
  return <MaterialCommunityIcons name="view-carousel-outline" color={color} size={size} />;
}

/** Horizontal list layout — "Tabs" */
export function TabsIcon({color, size = 16}: IconProps) {
  return <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />;
}
