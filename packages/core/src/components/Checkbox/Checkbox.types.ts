import type { TextStyle, ViewStyle } from 'react-native';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxSlots {
  root?: ViewStyle;
  box?: ViewStyle;
  checkmark?: ViewStyle;
  label?: TextStyle;
  description?: TextStyle;
}

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSize;
  unstyled?: boolean;
  slots?: CheckboxSlots;
  testID?: string;
  accessibilityLabel?: string;
}
