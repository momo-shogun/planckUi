import type { ReactNode } from 'react';
import type { ModalProps as RNModalProps, TextStyle, ViewStyle } from 'react-native';

export interface ModalProps extends Pick<RNModalProps, 'testID' | 'animationType' | 'presentationStyle'> {
  open: boolean;
  onRequestClose?: () => void;
  title?: string;
  children?: ReactNode;
  unstyled?: boolean;
  slots?: {
    overlay?: ViewStyle;
    surface?: ViewStyle;
    title?: TextStyle;
    body?: ViewStyle;
  };
}
