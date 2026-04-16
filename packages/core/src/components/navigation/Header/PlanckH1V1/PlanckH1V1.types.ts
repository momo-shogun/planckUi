import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { HeaderVariant } from '@my-ui-lib/tokens';

export interface PlanckH1V1Slots {
  root?: ViewStyle;
  left?: ViewStyle;
  right?: ViewStyle;
  /** Pass a custom search icon node. */
  searchIcon?: ReactNode;
  /** Pass a custom notifications icon node. */
  notificationIcon?: ReactNode;
}

export interface PlanckH1V1Props {
  /** Brand / product name displayed on the left. */
  title: string;
  /** Optional logo mark to show before the brand title. */
  logoIcon?: ReactNode;
  /** Called when the search icon is pressed. */
  onSearch: () => void;
  /** Called when the notifications icon is pressed. */
  onNotification: () => void;
  /** Shows a dot over the notifications icon. */
  notificationDot?: boolean;
  /**
   * Header background gradient colors.
   * Defaults to the Qwash-style purple → blue gradient.
   */
  backgroundGradientColors?: readonly [string, string];
  /** Visual variant mapped to tokens. */
  variant?: HeaderVariant;
  unstyled?: boolean;
  slots?: PlanckH1V1Slots;
  testID?: string;
}

