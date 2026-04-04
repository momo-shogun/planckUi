import type { TextStyle, ViewStyle } from 'react-native';
import type { BadgeIntent } from '@my-ui-lib/tokens';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeSlots {
  root?: ViewStyle;
  label?: TextStyle;
  dot?: ViewStyle;
}

export interface BadgeProps {
  label?: string;
  intent?: BadgeIntent;
  size?: BadgeSize;
  dot?: boolean;
  unstyled?: boolean;
  slots?: BadgeSlots;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}
