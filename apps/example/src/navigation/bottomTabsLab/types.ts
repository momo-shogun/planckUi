import type {BottomTabsLabPresetRouteKey} from './presets/presetKeys';

export type {BottomTabsLabPresetRouteKey} from './presets/presetKeys';

export type BottomTabsLabStackParamList = {
  BottomTabsMenu: undefined;
} & Record<BottomTabsLabPresetRouteKey, undefined>;
