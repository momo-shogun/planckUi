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

/** Same shape as {@link ZeptoTabBackgroundColors} — per tab `id` or index order. */
export type ZeptoTabLabelColors = ZeptoTabBackgroundColors;

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
  /**
   * Per-tab label color (by `id` or index). When set, overrides default active/inactive grays.
   */
  tabLabelColors?: ZeptoTabLabelColors;
  /**
   * Inactive tab tile fill behind the label. When omitted, uses the default subtle tint from styles.
   */
  inactiveTabTileBackgroundColor?: string;
  /** Show a search bar below the tabs (Zepto-style). */
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
