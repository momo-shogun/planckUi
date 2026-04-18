import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ZeptoHeaderV1Props } from '../../navigation/Header/ZeptoHeaderV1';
import type { ZeptoTabCProps } from '../../Tabs/ZeptoTabC';

export interface ZeptoHSProps {
  header: ZeptoHeaderV1Props;
  /** Props forwarded to {@link ZeptoTabC} (minus conflicting keys — there are none). */
  tabStrip: ZeptoTabCProps;
  /** Body below the category strip. */
  children?: ReactNode;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}
