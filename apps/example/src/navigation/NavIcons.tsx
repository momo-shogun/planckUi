/**
 * Lucide-based icons for the example app drawer. Uses `react-native-svg` under the hood.
 */
import React from 'react';
import {
  AppWindow,
  Bell,
  Grid2x2,
  LayoutList,
  PanelBottomOpen,
  PanelsLeftBottom,
} from 'lucide-react-native';

type IconProps = {color: string; size?: number};

const stroke = 2;

/** 2×2 grid — "Showcase / Overview" */
export function GridIcon({color, size = 16}: IconProps) {
  return <Grid2x2 color={color} size={size} strokeWidth={stroke} />;
}

/** Window — "Modal" */
export function ModalIcon({color, size = 16}: IconProps) {
  return <AppWindow color={color} size={size} strokeWidth={stroke} />;
}

/** Panel from bottom — "Bottom sheet" */
export function SheetIcon({color, size = 16}: IconProps) {
  return <PanelBottomOpen color={color} size={size} strokeWidth={stroke} />;
}

/** Bell — "Toasts" / notifications */
export function ToastIcon({color, size = 16}: IconProps) {
  return <Bell color={color} size={size} strokeWidth={stroke} />;
}

/** Composite layout — React Navigation bottom tabs */
export function BottomTabsIcon({color, size = 16}: IconProps) {
  return <PanelsLeftBottom color={color} size={size} strokeWidth={stroke} />;
}

/** Horizontal list layout — "Tabs" */
export function TabsIcon({color, size = 16}: IconProps) {
  return <LayoutList color={color} size={size} strokeWidth={stroke} />;
}
