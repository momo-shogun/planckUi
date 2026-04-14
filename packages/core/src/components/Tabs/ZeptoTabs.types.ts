import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ZeptoTabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

export type ZeptoTabBackgroundColors =
  | string[]
  | Record<string, string>;

export interface ZeptoTabsProps {
  tabs: ZeptoTabItem[];
  /** Controlled selection (preferred with `onChange`). */
  activeIndex?: number;
  defaultActiveIndex?: number;
  onChange?: (index: number, tab: ZeptoTabItem) => void;
  /**
   * Per-tab colors for the animated outer track, same order as `tabs` or keyed by `id`.
   */
  tabBackgroundColors: ZeptoTabBackgroundColors;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
