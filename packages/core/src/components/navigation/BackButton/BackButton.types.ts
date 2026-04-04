import type { ViewStyle } from 'react-native';
import type { HeaderVariant } from '@my-ui-lib/tokens';

export interface BackButtonSlots {
  root?: ViewStyle;
  chevron?: ViewStyle;
}

export interface BackButtonProps {
  onPress: () => void;
  variant?: HeaderVariant;
  unstyled?: boolean;
  slots?: BackButtonSlots;
  testID?: string;
}
