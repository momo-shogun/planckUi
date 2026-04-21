import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface PlankImgBgV1Tag {
  label: string;
  icon?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

export interface PlankImgBgV1Slots {
  root?: ViewStyle;
}

export interface PlankImgBgV1Props {
  backgroundImageSrc?: string;
  backgroundOverlayColor?: string;
  backgroundOverlayOpacity?: number;

  tagLeft?: PlankImgBgV1Tag;
  tagRight?: PlankImgBgV1Tag;

  title: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;

  avatarSrcs?: string[];
  avatarsBorderColor?: string;
  joinedText?: string;
  joinedTextColor?: string;

  footerIcon?: ReactNode;
  footerText?: string;
  footerBackgroundColor?: string;
  footerTextColor?: string;

  borderColor?: string;
  backgroundColor?: string;

  onPress?: () => void;
  unstyled?: boolean;
  slots?: PlankImgBgV1Slots;
  testID?: string;
}

