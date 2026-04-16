import type { ReactNode } from 'react';
import type { PressableProps, TextStyle, ViewStyle } from 'react-native';

type PressablePassthrough = Omit<
  PressableProps,
  'children' | 'onPress' | 'disabled' | 'style' | 'testID' | 'accessibilityLabel'
>;

export interface PillButtonV1Slots {
  root?: ViewStyle;
  text?: TextStyle;
}

export interface PillButtonV1Props extends PressablePassthrough {
  testID?: string;
  accessibilityLabel?: string;
  /**
   * shadcn-like variants.
   * - default: solid/gradient pill
   * - secondary: muted solid pill
   * - outline: transparent with border
   * - ghost: transparent, no border
   */
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /**
   * Background gradient colors.
   * Defaults to a solid black pill (same color twice).
   */
  backgroundGradientColors?: readonly [string, string];
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  children?: ReactNode;
  slots?: PillButtonV1Slots;
  unstyled?: boolean;
}

