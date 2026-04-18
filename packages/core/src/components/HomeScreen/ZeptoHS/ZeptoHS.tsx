import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { ZeptoHeaderV1 } from '../../navigation/Header/ZeptoHeaderV1';
import { ZeptoTabC } from '../../Tabs/ZeptoTabC';
import type { ZeptoHSProps } from './ZeptoHS.types';
import { ZeptoTabs } from '../../Tabs/ZeptoTabs';

// ---------------------------------------------------------------------------
// ZeptoHS shell — single place for category-driven colors
//
// Top row (ZeptoTabs): each tab id has `topTabsBackground` → `ZeptoTabs`
//   `tabBackgroundColors` (animated tab strip + search section tint).
//
// For the *active* top category only:
//   `headerBackground`  → `ZeptoHeaderV1` `backgroundColor`
//   `categoryStripBackground` → `ZeptoTabC` `backgroundColor`
//
// Unknown tab id or missing entry: all three fall back to `header.backgroundColor`
// from props (required on `ZeptoHeaderV1Props`).
// ---------------------------------------------------------------------------

type ZeptoHSShellColors = {
  /** `ZeptoHeaderV1` bar while this category is selected */
  headerBackground: string;
  /** `ZeptoTabs` `tabBackgroundColors` entry for this tab id */
  topTabsBackground: string;
  /** `ZeptoTabC` bar while this category is selected */
  categoryStripBackground: string;
};

function uniformShell(bg: string): ZeptoHSShellColors {
  return {
    headerBackground: bg,
    topTabsBackground: bg,
    categoryStripBackground: bg,
  };
}

/** Per top-category `id` — edit here to change header / tabs / strip together or per layer */
const ZEPTO_HS_SHELL_BY_CATEGORY_ID: Record<string, ZeptoHSShellColors> = {
  groceries: uniformShell('#E6C8A4'),
  pharmacy: uniformShell('#E0F2FE'),
  elect: uniformShell('#ECFDF5'),
  cafe: uniformShell('#FFF7ED'),
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
      const shell = resolveZeptoHSShellColors(tab.id, header.backgroundColor);
      byId[tab.id] = shell.topTabsBackground;
    }
    return byId;
  }, [header.backgroundColor]);

  const activeShell = resolveZeptoHSShellColors(activeTopCategoryId, header.backgroundColor);

  // Explicit names at the call site (maps 1:1 to component props below)
  const headerBackgroundColor = activeShell.headerBackground;
  const zeptoTabsTabBackgroundColors = topTabsTabBackgroundColors;
  const zeptoTabCStripBackgroundColor = activeShell.categoryStripBackground;

  return (
    <View style={[{ flex: 1 }, style]} testID={testID}>
      <ZeptoHeaderV1 {...header} backgroundColor={headerBackgroundColor} />
      <ZeptoTabs
        tabs={ZEPTO_HS_TOP_CATEGORY_TABS}
        tabBackgroundColors={zeptoTabsTabBackgroundColors}
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
