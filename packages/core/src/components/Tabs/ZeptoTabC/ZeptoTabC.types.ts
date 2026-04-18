import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type ZeptoTabCBadgeVariant = 'new' | 'sale';

export interface ZeptoTabCBadge {
  text: string;
  /** Pill (NEW) vs banner (SALE). @default 'new' */
  variant?: ZeptoTabCBadgeVariant;
}

export interface ZeptoTabCItem {
  id: string;
  label: string;
  /** e.g. `<MaterialCommunityIcons name="shopping" size={28} color="#111" />` */
  icon: ReactNode;
  badge?: ZeptoTabCBadge;
}

export interface ZeptoTabCProps {
  tabs: ZeptoTabCItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onChange?: (index: number, tab: ZeptoTabCItem) => void;
  /** Bar background (peach / beige in reference). @default '#F3DFCC' */
  backgroundColor?: string;
  /** Bottom indicator and active label use this color. @default '#0A0A0A' */
  accentColor?: string;
  /** Inactive label color. @default '#0A0A0A' */
  labelColor?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
