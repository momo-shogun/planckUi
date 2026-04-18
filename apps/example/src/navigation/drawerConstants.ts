import type {NavigatorScreenParams} from '@react-navigation/native';
import type {BottomTabsLabStackParamList} from './bottomTabsLab/types';
import type {HeaderLabStackParamList} from './headerLab/types';
import type {HomeScreenLabStackParamList} from './homeLab/types';
import type {ButtonLabStackParamList} from './buttonLab/types';
import type {CardsLabStackParamList} from './cardsLab/types';

/**
 * Single source for drawer route keys used with React Navigation and Planck DrawerContent.
 */
export const DRAWER_ITEMS = [
  {key: 'Showcase', label: 'Showcase'},
  {key: 'ModalLab', label: 'Modal'},
  {key: 'SheetLab', label: 'Bottom sheet'},
  {key: 'ToastLab', label: 'Toasts'},
  {key: 'ButtonLab', label: 'Button'},
  {key: 'CardsLab', label: 'Cards'},
  {key: 'InputLab', label: 'Input'},
  {key: 'HeaderLab', label: 'Header'},
  {key: 'HomeScreenLab', label: 'Home screens'},
  {key: 'TabsLab', label: 'Tabs & tab bar'},
  {key: 'BottomTabsLab', label: 'Bottom tabs lab'},
] as const;

export type DrawerRoute = (typeof DRAWER_ITEMS)[number]['key'];

export type RootDrawerParamList = {
  Showcase: undefined;
  ModalLab: undefined;
  SheetLab: undefined;
  ToastLab: undefined;
  ButtonLab: NavigatorScreenParams<ButtonLabStackParamList> | undefined;
  CardsLab: NavigatorScreenParams<CardsLabStackParamList> | undefined;
  InputLab: undefined;
  HeaderLab: NavigatorScreenParams<HeaderLabStackParamList> | undefined;
  HomeScreenLab: NavigatorScreenParams<HomeScreenLabStackParamList> | undefined;
  TabsLab: undefined;
  BottomTabsLab: NavigatorScreenParams<BottomTabsLabStackParamList> | undefined;
};
