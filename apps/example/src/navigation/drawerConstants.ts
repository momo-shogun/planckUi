import type {NavigatorScreenParams} from '@react-navigation/native';
import type {BottomTabsLabStackParamList} from './bottomTabsLab/types';
import type {HeaderLabStackParamList} from './headerLab/types';

/**
 * Single source for drawer route keys used with React Navigation and Planck DrawerContent.
 */
export const DRAWER_ITEMS = [
  {key: 'Showcase', label: 'Showcase'},
  {key: 'ModalLab', label: 'Modal'},
  {key: 'SheetLab', label: 'Bottom sheet'},
  {key: 'ToastLab', label: 'Toasts'},
  {key: 'ButtonLab', label: 'Button'},
  {key: 'InputLab', label: 'Input'},
  {key: 'HeaderLab', label: 'Header'},
  {key: 'TabsLab', label: 'Tabs & tab bar'},
  {key: 'BottomTabsLab', label: 'Bottom tabs lab'},
] as const;

export type DrawerRoute = (typeof DRAWER_ITEMS)[number]['key'];

export type RootDrawerParamList = {
  Showcase: undefined;
  ModalLab: undefined;
  SheetLab: undefined;
  ToastLab: undefined;
  ButtonLab: undefined;
  InputLab: undefined;
  HeaderLab: NavigatorScreenParams<HeaderLabStackParamList> | undefined;
  TabsLab: undefined;
  BottomTabsLab: NavigatorScreenParams<BottomTabsLabStackParamList> | undefined;
};
