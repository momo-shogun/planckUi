/**
 * Separate entry so apps that do not use ZeptoTabs (e.g. Next.js docs with
 * react-native-web) never bundle react-native-reanimated / RN Fabric.
 */
export { ZeptoTabs } from './components/Tabs/ZeptoTabs';
export type {
  ZeptoTabBackgroundColors,
  ZeptoTabItem,
  ZeptoTabsProps,
} from './components/Tabs/ZeptoTabs.types';
