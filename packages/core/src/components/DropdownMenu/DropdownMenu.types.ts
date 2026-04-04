import type { ReactNode } from 'react';
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface DropdownMenuItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export type DropdownMenuMode = 'anchored' | 'modal';

export type DropdownMenuPosition = 'auto' | 'top' | 'bottom';

export interface DropdownMenuRenderItemContext {
  selected: boolean;
  disabled: boolean;
}

export interface DropdownMenuSlots {
  root?: ViewStyle;
  trigger?: ViewStyle;
  triggerText?: TextStyle;
  backdrop?: ViewStyle;
  /** Anchored: absolutely positioned shell; modal: centered card */
  menuContainer?: ViewStyle;
  menu?: ViewStyle;
  menuItem?: ViewStyle;
  menuItemText?: TextStyle;
  menuItemSelected?: ViewStyle;
  searchInput?: TextStyle;
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  placeholder?: string;
  disabled?: boolean;
  unstyled?: boolean;
  /**
   * `anchored` (default): list aligns to the trigger width under/over it.
   * `modal`: compact centered panel (similar to element-dropdown `mode="modal"`).
   */
  mode?: DropdownMenuMode;
  /** Where the anchored list opens; `auto` picks the side with more room. */
  dropdownPosition?: DropdownMenuPosition;
  /** Max height of the scrollable list (search row excluded). */
  maxHeight?: number;
  /** Anchored only: minimum menu width (defaults to trigger width). */
  menuMinWidth?: number;
  /** Modal only: max width of the panel. */
  modalMaxWidth?: number;
  search?: boolean;
  searchPlaceholder?: string;
  /** Called when the search field text changes. */
  onChangeSearchText?: (text: string) => void;
  /**
   * Custom filter; return true to include the item for the current keyword.
   * Keyword is the trimmed search text (empty means no filter).
   */
  filterItem?: (keyword: string, item: DropdownMenuItem) => boolean;
  renderItem?: (
    item: DropdownMenuItem,
    context: DropdownMenuRenderItemContext
  ) => ReactNode;
  showsVerticalScrollIndicator?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  searchInputProps?: Omit<
    TextInputProps,
    'value' | 'onChangeText' | 'placeholder' | 'style'
  >;
  slots?: DropdownMenuSlots;
  testID?: string;
  accessibilityLabel?: string;
}
