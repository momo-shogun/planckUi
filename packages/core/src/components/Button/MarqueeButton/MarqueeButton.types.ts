import type { ReactNode } from 'react';
import type { PressableProps, TextStyle, ViewStyle } from 'react-native';

type PressablePassthrough = Omit<
  PressableProps,
  'children' | 'onPress' | 'disabled' | 'style' | 'testID' | 'accessibilityLabel'
>;

export interface MarqueeButtonSlots {
  root?: ViewStyle;
  text?: TextStyle;
}

export interface MarqueeButtonProps extends PressablePassthrough {
  testID?: string;
  accessibilityLabel?: string;

  /** The marquee text content */
  text: string;

  onPress?: () => void;
  disabled?: boolean;
  unstyled?: boolean;

  /** Pill sizing */
  size?: 'sm' | 'md' | 'lg';

  /** Scroll direction */
  direction?: 'left' | 'right';

  /**
   * Always scroll (infinite) even if text fits.
   * Defaults to true for "marquee button" behavior.
   */
  alwaysMarquee?: boolean;

  /** Scroll speed in pixels / second */
  speedPxPerSec?: number;

  /** Gap between repeated text runs (px) */
  gapPx?: number;

  /** Background + text colors */
  backgroundColor?: string;
  textColor?: string;

  /** Optional left/right adornments (non-marquee) */
  left?: ReactNode;
  right?: ReactNode;

  slots?: MarqueeButtonSlots;
}

