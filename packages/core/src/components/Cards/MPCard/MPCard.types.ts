import type { ReactNode } from 'react';
import type { PressableProps, TextStyle, ViewStyle } from 'react-native';

type PressablePassthrough = Omit<
  PressableProps,
  'children' | 'onPress' | 'disabled' | 'style' | 'testID' | 'accessibilityLabel'
>;

export interface MPCardSlots {
  root?: ViewStyle;
  name?: TextStyle;
  title?: TextStyle;
  meta?: TextStyle;
  progressTrack?: ViewStyle;
  progressFill?: ViewStyle;
  iconButton?: ViewStyle;
}

export interface MPCardProps extends PressablePassthrough {
  testID?: string;
  accessibilityLabel?: string;

  /** Top-left avatar */
  avatar: ReactNode;

  /** Main name (e.g. "Katy Fuller") */
  name: string;

  /** Subtitle (e.g. "Fullstack Engineer") */
  subtitle?: string;

  /** Match rate label and progress */
  matchRatePct?: number; // 0..100

  /** Optional outer press */
  onPress?: () => void;

  /** Top-right action (external / open) */
  onPressTopRight?: () => void;
  topRightIcon?: ReactNode;

  /** Bottom-right actions */
  onPressChat?: () => void;
  chatIcon?: ReactNode;
  onPressCall?: () => void;
  callIcon?: ReactNode;

  /** Visual customization */
  backgroundGradientColors?: readonly [string, string];
  backgroundColor?: string; // used if no gradient
  textColor?: string;
  mutedTextColor?: string;
  progressColor?: string;
  progressTrackColor?: string;

  disabled?: boolean;
  unstyled?: boolean;
  slots?: MPCardSlots;
}

