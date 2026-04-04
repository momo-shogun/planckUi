import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { HeaderVariant } from '@my-ui-lib/tokens';

export interface HeaderSlots {
  root?: ViewStyle;
  side?: ViewStyle;
  center?: ViewStyle;
  title?: TextStyle;
  subtitle?: TextStyle;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  variant?: HeaderVariant;
  unstyled?: boolean;
  slots?: HeaderSlots;
  testID?: string;
}
