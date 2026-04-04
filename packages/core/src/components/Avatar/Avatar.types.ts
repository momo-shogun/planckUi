import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { AvatarVariant } from '@my-ui-lib/tokens';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarBadge = 'online' | 'offline' | 'busy';

export interface AvatarSlots {
  root?: ViewStyle;
  image?: ImageStyle;
  fallback?: ViewStyle;
  fallbackText?: TextStyle;
  badge?: ViewStyle;
}

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  badge?: AvatarBadge;
  unstyled?: boolean;
  slots?: AvatarSlots;
  testID?: string;
}
