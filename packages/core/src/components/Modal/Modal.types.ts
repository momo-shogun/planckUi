import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalSlots {
  overlay?: ViewStyle;
  backdrop?: ViewStyle;
  surface?: ViewStyle;
  content?: ViewStyle;
}

export interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  /** Backdrop tap closes (default true). */
  closeOnBackdrop?: boolean;
  /** Android hardware back closes (default true). */
  closeOnBack?: boolean;
  size?: ModalSize;
  children?: ReactNode;
  unstyled?: boolean;
  slots?: ModalSlots;
  testID?: string;
}

export interface ModalHeaderSlots {
  root?: ViewStyle;
  title?: TextStyle;
}

export interface ModalHeaderProps {
  children?: ReactNode;
  unstyled?: boolean;
  slots?: ModalHeaderSlots;
  testID?: string;
}

export interface ModalBodySlots {
  root?: ViewStyle;
}

export interface ModalBodyProps {
  children?: ReactNode;
  unstyled?: boolean;
  slots?: ModalBodySlots;
  testID?: string;
}

export interface ModalFooterSlots {
  root?: ViewStyle;
}

export interface ModalFooterProps {
  children?: ReactNode;
  unstyled?: boolean;
  slots?: ModalFooterSlots;
  testID?: string;
}
