import type { ReactNode } from 'react';
import type { PressableProps, ViewStyle } from 'react-native';

type PressablePassthrough = Omit<
  PressableProps,
  'children' | 'onPress' | 'disabled' | 'style' | 'testID' | 'accessibilityLabel'
>;

export interface ButtonIconOnlySlots {
  root?: ViewStyle;
}

export interface ButtonIconOnlyProps extends PressablePassthrough {
  testID?: string;
  accessibilityLabel?: string;
  icon: ReactNode;
  onPress?: () => void;
  disabled?: boolean;

  /** shadcn-like variants for icon-only buttons */
  variant?: 'ghost' | 'soft' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';

  /** Optional controlled active/toggled state */
  active?: boolean;

  /**
   * Overrides for background colors.
   * Useful to match gradients like headers (use same color twice for solid).
   */
  backgroundColor?: string;
  pressedBackgroundColor?: string;
  activeBackgroundColor?: string;

  slots?: ButtonIconOnlySlots;
  unstyled?: boolean;
}

