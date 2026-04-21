import type { ViewStyle } from 'react-native';

export interface CoffeeInviteCardSlots {
  root?: ViewStyle;
  avatarWrap?: ViewStyle;
  mutualsRow?: ViewStyle;
  primaryButton?: ViewStyle;
  secondaryButton?: ViewStyle;
}

export interface CoffeeInviteCardProps {
  /**
   * Main profile image.
   * If not provided, a default Unsplash image is used.
   */
  avatarSrc?: string;
  name: string;
  role: string;
  handle?: string;

  mutualCount?: number;
  /**
   * Up to 4 small avatars shown as "mutuals".
   */
  mutualAvatarSrcs?: string[];

  /**
   * Visual customization (all optional).
   */
  cardBackgroundColor?: string;
  cardBorderColor?: string;
  avatarWrapBackgroundColor?: string;
  nameColor?: string;
  roleColor?: string;
  handleColor?: string;
  mutualTextColor?: string;
  primaryButtonBorderColor?: string;
  primaryButtonTextColor?: string;
  secondaryTextColor?: string;

  primaryLabel?: string;
  onPressPrimary?: () => void;

  secondaryLabel?: string;
  onPressSecondary?: () => void;

  unstyled?: boolean;
  slots?: CoffeeInviteCardSlots;
  testID?: string;
}

