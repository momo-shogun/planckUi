/**
 * Single source for drawer route keys used with React Navigation and Planck DrawerContent.
 */
export const DRAWER_ITEMS = [
  {key: 'Showcase', label: 'Showcase'},
  {key: 'ModalLab', label: 'Modal'},
  {key: 'SheetLab', label: 'Bottom sheet'},
  {key: 'ToastLab', label: 'Toasts'},
  {key: 'TabsLab', label: 'Tabs & tab bar'},
] as const;

export type DrawerRoute = (typeof DRAWER_ITEMS)[number]['key'];

export type RootDrawerParamList = Record<DrawerRoute, undefined>;
