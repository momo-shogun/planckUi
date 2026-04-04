import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { TabBarVariant } from '@my-ui-lib/tokens';

export interface TabBarItem {
  key: string;
  label: string;
  icon: (active: boolean) => ReactNode;
}

export interface TabBarSlots {
  root?: ViewStyle;
  item?: ViewStyle;
  itemActive?: ViewStyle;
  label?: TextStyle;
  labelActive?: TextStyle;
  iconWrap?: ViewStyle;
  indicator?: ViewStyle;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: TabBarVariant;
  unstyled?: boolean;
  slots?: TabBarSlots;
  testID?: string;
}
