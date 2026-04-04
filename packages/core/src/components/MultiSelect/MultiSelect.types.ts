import type { ReactNode } from 'react';
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type {
  DropdownMenuItem,
  DropdownMenuMode,
  DropdownMenuPosition,
} from '../DropdownMenu/DropdownMenu.types';

export type MultiSelectItem = DropdownMenuItem;

export interface MultiSelectRenderItemContext {
  selected: boolean;
  disabled: boolean;
}

export interface MultiSelectSlots {
  root?: ViewStyle;
  trigger?: ViewStyle;
  triggerText?: TextStyle;
  backdrop?: ViewStyle;
  menuContainer?: ViewStyle;
  menu?: ViewStyle;
  menuItem?: ViewStyle;
  menuItemText?: TextStyle;
  menuItemSelected?: ViewStyle;
  searchInput?: TextStyle;
}

export interface MultiSelectProps {
  items: MultiSelectItem[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (ids: string[]) => void;
  /** Alias for `onValueChange`. Both fire when provided. */
  onChange?: (ids: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  unstyled?: boolean;
  mode?: DropdownMenuMode;
  dropdownPosition?: DropdownMenuPosition;
  maxHeight?: number;
  menuMinWidth?: number;
  modalMaxWidth?: number;
  search?: boolean;
  searchPlaceholder?: string;
  onChangeSearchText?: (text: string) => void;
  filterItem?: (keyword: string, item: MultiSelectItem) => boolean;
  renderItem?: (
    item: MultiSelectItem,
    context: MultiSelectRenderItemContext
  ) => ReactNode;
  /** Maximum number of selections (omit for unlimited). */
  maxSelections?: number;
  showsVerticalScrollIndicator?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  searchInputProps?: Omit<
    TextInputProps,
    'value' | 'onChangeText' | 'placeholder' | 'style'
  >;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  slots?: MultiSelectSlots;
  testID?: string;
  accessibilityLabel?: string;
}
