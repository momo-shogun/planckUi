import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface InputProps extends Pick<TextInputProps, 'testID' | 'accessibilityLabel' | 'keyboardType'> {
  value?: string;
  defaultValue?: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  unstyled?: boolean;
  slots?: {
    root?: ViewStyle;
    label?: TextStyle;
    input?: ViewStyle & TextStyle;
    errorText?: TextStyle;
  };
}
