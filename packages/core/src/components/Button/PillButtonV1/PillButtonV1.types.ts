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

