import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

export interface DrawerItem {
  key: string;
  label: string;
  badge?: string | number;
}

export interface DrawerContentSlots {
  root?: ViewStyle;
  header?: ViewStyle;
  footer?: ViewStyle;
  item?: ViewStyle;
  itemActive?: ViewStyle;
  itemLabel?: TextStyle;
  itemLabelActive?: TextStyle;
  badge?: ViewStyle;
  badgeText?: TextStyle;
}

export interface DrawerContentProps {
  items: DrawerItem[];
  activeKey: string;
  onItemPress: (key: string) => void;
  header?: ReactNode;
  footer?: ReactNode;
  unstyled?: boolean;
  slots?: DrawerContentSlots;
  testID?: string;
}
