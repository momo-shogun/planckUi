import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { ZeptoHeaderV1 } from '../../navigation/Header/ZeptoHeaderV1';
import { ZeptoTabC } from '../../Tabs/ZeptoTabC';
import type { ZeptoHSProps } from './ZeptoHS.types';
import { ZeptoTabs } from '../../Tabs/ZeptoTabs';
import { darkenHex, ZEPTO_TABS_TRACK_DARKEN } from '../../../utils/darkenHex';

// ---------------------------------------------------------------------------
// ZeptoHS shell — single place for category-driven colors
//
// Top row (ZeptoTabs): each tab id has `topTabsBackground` → `ZeptoTabs`
//   `tabBackgroundColors` (animated tab strip + search section tint).
//   `tabLabelColor` → `ZeptoTabs` `tabLabelColors` (per tab). Inactive tiles use
//   `ZEPTO_HS_INACTIVE_TAB_TILE_BG` via `inactiveTabTileBackgroundColor`.
//
// For the *active* top category only:
//   `ZeptoHeaderV1` `backgroundColor` → same as ZeptoTabs row behind tabs:
//   darkenHex(`topTabsBackground`, ZEPTO_TABS_TRACK_DARKEN) (see `ZeptoTabs` `tabsBg`).
//   `categoryStripBackground` → `ZeptoTabC` `backgroundColor`
//
// Unknown tab id or missing entry: all three fall back to `header.backgroundColor`
// from props (required on `ZeptoHeaderV1Props`).
// ---------------------------------------------------------------------------

type ZeptoHSShellColors = {
  /**
   * Header-adjacent base (keep aligned with `topTabsBackground` when using `uniformShell`).
   * The real header bar uses the darkened tab-track color — see `headerBackgroundColor` below.
   */
  headerBackground: string;
  /** `ZeptoTabs` `tabBackgroundColors` entry for this tab id (and source for header darken) */
  topTabsBackground: string;
  /** `ZeptoTabC` bar while this category is selected */
  categoryStripBackground: string;
  /** `ZeptoTabs` label color for this tab id */
  tabLabelColor: string;
};

function uniformShell(fallbackBackground: string): ZeptoHSShellColors {
  return {
    headerBackground: fallbackBackground,
    topTabsBackground: fallbackBackground,
    categoryStripBackground: fallbackBackground,
    tabLabelColor: '#0A0A0A',
  };
}

/** One row in `ZEPTO_HS_SHELL_BY_CATEGORY_ID` — tweak bg vs label independently */
function shell(topTabsBackground: string, tabLabelColor: string): ZeptoHSShellColors {
  return {
    headerBackground: topTabsBackground,
    topTabsBackground,
    categoryStripBackground: topTabsBackground,
    tabLabelColor,
  };
}

/** Inactive ZeptoTabs tile fill (active tile stays transparent over the sliding highlight). */
const ZEPTO_HS_INACTIVE_TAB_TILE_BG = '#FFFFFF';

/** Per top-category `id` — edit here to change header / tabs / strip / tab labels */
const ZEPTO_HS_SHELL_BY_CATEGORY_ID: Record<string, ZeptoHSShellColors> = {
  groceries: shell('#E6C8A4', '#9333EA'),
  pharmacy: shell('#E0F2FE', '#5B21B6'),
  elect: shell('#ECFDF5', '#0A0A0A'),
  cafe: shell('#FFF7ED', '#0A0A0A'),
};

/** Top `ZeptoTabs` categories (`id` must exist as a key in `ZEPTO_HS_SHELL_BY_CATEGORY_ID` for themed colors) */
const ZEPTO_HS_TOP_CATEGORY_TABS = [
  { id: 'groceries', label: 'zepto' },
  { id: 'pharmacy', label: 'Pharmacy' },
  { id: 'elect', label: 'Electric' },
  // { id: 'cafe', label: 'Café' },
];

function resolveZeptoHSShellColors(
  categoryId: string | undefined,
  fallbackBackground: string
): ZeptoHSShellColors {
  if (!categoryId) {
    return uniformShell(fallbackBackground);
  }
  return ZEPTO_HS_SHELL_BY_CATEGORY_ID[categoryId] ?? uniformShell(fallbackBackground);
}

export function ZeptoHS(props: ZeptoHSProps) {
  const { header, tabStrip, children, testID, style } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopCategoryIndex, setActiveTopCategoryIndex] = useState(0);

  const activeTopCategoryId = ZEPTO_HS_TOP_CATEGORY_TABS[activeTopCategoryIndex]?.id;

  const topTabsTabBackgroundColors = useMemo(() => {
    const byId: Record<string, string> = {};
    for (const tab of ZEPTO_HS_TOP_CATEGORY_TABS) {
      const row = resolveZeptoHSShellColors(tab.id, header.backgroundColor);
      byId[tab.id] = row.topTabsBackground;
    }
    return byId;
  }, [header.backgroundColor]);

  const topTabsTabLabelColors = useMemo(() => {
    const byId: Record<string, string> = {};
    for (const tab of ZEPTO_HS_TOP_CATEGORY_TABS) {
      const row = resolveZeptoHSShellColors(tab.id, header.backgroundColor);
      byId[tab.id] = row.tabLabelColor;
    }
    return byId;
  }, [header.backgroundColor]);

  const activeShell = resolveZeptoHSShellColors(activeTopCategoryId, header.backgroundColor);

  // Explicit names at the call site (maps 1:1 to component props below)
  const headerBackgroundColor = useMemo(
    () => darkenHex(activeShell.topTabsBackground, ZEPTO_TABS_TRACK_DARKEN),
    [activeShell.topTabsBackground]
  );
  const zeptoTabsTabBackgroundColors = topTabsTabBackgroundColors;
  const zeptoTabCStripBackgroundColor = activeShell.categoryStripBackground;

  return (
    <View style={[{ flex: 1 }, style]} testID={testID}>
      <ZeptoHeaderV1 {...header} backgroundColor={headerBackgroundColor} />
      <ZeptoTabs
        tabs={ZEPTO_HS_TOP_CATEGORY_TABS}
        tabBackgroundColors={zeptoTabsTabBackgroundColors}
        tabLabelColors={topTabsTabLabelColors}
        inactiveTabTileBackgroundColor={ZEPTO_HS_INACTIVE_TAB_TILE_BG}
        activeIndex={activeTopCategoryIndex}
        defaultActiveIndex={0}
        onChange={(index) => setActiveTopCategoryIndex(index)}
        showSearch
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search for “Iphone”"
        style={{ borderRadius: 0 }}
      />
      <ZeptoTabC {...tabStrip} backgroundColor={zeptoTabCStripBackgroundColor} />

      {children != null ? <View style={{ flex: 1 }}>{children}</View> : null}
    </View>
  );
}

ZeptoHS.displayName = 'ZeptoHS';
