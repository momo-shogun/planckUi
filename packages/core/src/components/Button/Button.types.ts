import type { ReactNode } from 'react';
import type { PressableProps, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps extends Pick<PressableProps, 'testID' | 'accessibilityLabel'> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  unstyled?: boolean;
  slots?: { root?: ViewStyle; text?: TextStyle; loader?: ViewStyle };
  onPress?: () => void;
  children?: ReactNode;
}
