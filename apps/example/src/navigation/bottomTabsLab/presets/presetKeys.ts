/**
 * Stack route names for bottom-tabs lab presets (one string per preset folder).
 * When adding a preset: add its `routeKey` here and register it in `registry.ts`.
 */
export const BOTTOM_TABS_LAB_PRESET_ROUTE_KEYS = ['PresetPlankBarV1'] as const;

export type BottomTabsLabPresetRouteKey = (typeof BOTTOM_TABS_LAB_PRESET_ROUTE_KEYS)[number];
