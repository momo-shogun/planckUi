import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';

export interface BottomSheetSlots {
  sheet?: ViewStyle;
  content?: ViewStyle;
}

export interface BottomSheetProps {
  visible: boolean;
  onClose?: () => void;
  snapPoints?: Array<string | number>;
  title?: string;
  children?: ReactNode;
  unstyled?: boolean;
  slots?: BottomSheetSlots;
  testID?: string;
  /** Extra props forwarded to the underlying BottomSheetModal. */
  modalProps?: Omit<
    BottomSheetModalProps,
    'children' | 'snapPoints' | 'onDismiss' | 'backdropComponent'
  >;
}
