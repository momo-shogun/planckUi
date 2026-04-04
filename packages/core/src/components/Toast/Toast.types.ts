import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { ToastIntent } from '@my-ui-lib/tokens';

export const TOAST_MAX_VISIBLE = 3;
export const DEFAULT_TOAST_DURATION_MS = 4000;

export interface ToastShowOptions {
  id?: string;
  title: string;
  description?: string;
  intent?: ToastIntent;
  /** Auto-dismiss duration in ms (default 4000). */
  duration?: number;
}

export interface ToastSlots {
  root?: ViewStyle;
  title?: TextStyle;
  description?: TextStyle;
  progressTrack?: ViewStyle;
  progressFill?: ViewStyle;
}

export interface ToastProps {
  title: string;
  description?: string;
  intent?: ToastIntent;
  /** 0–1 animated progress (remaining time). */
  progress: InstanceType<typeof import('react-native').Animated.Value>;
  unstyled?: boolean;
  slots?: ToastSlots;
  testID?: string;
}

export interface ToastContextValue {
  showToast: (options: ToastShowOptions) => string;
  dismissToast: (id: string) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}
