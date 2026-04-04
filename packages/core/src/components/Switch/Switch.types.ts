import type { TextStyle, ViewStyle } from 'react-native';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchSlots {
  root?: ViewStyle;
  track?: ViewStyle;
  thumb?: ViewStyle;
  label?: TextStyle;
}

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: SwitchSize;
  unstyled?: boolean;
  slots?: SwitchSlots;
  testID?: string;
  accessibilityLabel?: string;
}
