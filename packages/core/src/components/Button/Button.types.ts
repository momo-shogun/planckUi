import type { ReactNode } from 'react';
import type { PressableProps, TextStyle, ViewStyle } from 'react-native';

type ButtonPressablePassthrough = Omit<
  PressableProps,
  | 'children'
  | 'onPress'
  | 'disabled'
  | 'style'
  | 'testID'
  | 'accessibilityLabel'
>;

export interface ButtonProps extends ButtonPressablePassthrough {
  testID?: string;
  accessibilityLabel?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  unstyled?: boolean;
  slots?: { root?: ViewStyle; text?: TextStyle; loader?: ViewStyle };
  onPress?: () => void;
  children?: ReactNode;
}
