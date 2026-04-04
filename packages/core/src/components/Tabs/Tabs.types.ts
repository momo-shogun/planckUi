import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { TabsVariant } from '@my-ui-lib/tokens';

export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabDef {
  key: string;
  label: string;
  badge?: number;
}

export interface TabsSlots {
  root?: ViewStyle;
  tabBar?: ViewStyle;
  tab?: ViewStyle;
  tabLabel?: TextStyle;
  tabBadge?: ViewStyle;
  tabBadgeText?: TextStyle;
  indicator?: ViewStyle;
  content?: ViewStyle;
}

export interface TabsProps {
  tabs: TabDef[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  scrollable?: boolean;
  children?: ReactNode;
  unstyled?: boolean;
  slots?: TabsSlots;
  testID?: string;
}

export interface TabPanelProps {
  tabKey: string;
  children?: ReactNode;
}
