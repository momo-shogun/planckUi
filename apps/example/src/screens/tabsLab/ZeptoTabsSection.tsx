import React, { useMemo, useState } from 'react';
import { Text, VStack, ZeptoTabC, useTheme } from '@my-ui-lib/core';
import { ZeptoTabs } from '@my-ui-lib/core/zepto-tabs';
import { StyleSheet, View } from 'react-native';
import { getZeptoTabCShowcaseItems } from '../../showcase/zeptoTabCShowcaseItems';

const zeptoTabs = [
  { id: 'groceries', label: 'zepto' },
  { id: 'pharmacy', label: 'Pharmacy' },
  { id: 'elect', label: 'Electric' },
  // { id: 'cafe', label: 'Café' },
];

const zeptoColors: Record<string, string> = {
  groceries: '#F3E8FF',
  pharmacy: '#E0F2FE',
  electronics: '#ECFDF5',
  cafe: '#FFF7ED',
};

function DotIcon({ color }: { color: string }) {
  return (
    <View
      style={[
        styles.dot,
        {
          backgroundColor: color,
        },
      ]}
    />
  );
}

const tabsWithIcons = [
  { id: 'all', label: 'All', icon: <DotIcon color="#6366F1" /> },
  { id: 'veg', label: 'Veg', icon: <DotIcon color="#22C55E" /> },
  { id: 'nonveg', label: 'Non-veg', icon: <DotIcon color="#F97316" /> },
];

const iconTabColors = ['#F4F4F5', '#EFF6FF', '#FEF3C7'];

export function ZeptoTabsSection() {
  const theme = useTheme();
  const [ix, setIx] = useState(0);
  const [q, setQ] = useState('');
  const [zeptoTabCIx, setZeptoTabCIx] = useState(0);

  const zeptoTabCItems = useMemo(() => getZeptoTabCShowcaseItems(), []);

  return (
    <VStack gap={theme.spacing[2]}>
      <View style={{ padding: theme.spacing[4] }}>
        <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
          ZeptoTabs
        </Text>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Pill strip with Reanimated background, sliding highlight, and spring
          scale; tabs share the row width (no horizontal scroll). Open this screen
          from the drawer: Tabs & tab bar.
        </Text>
      </View>
      <ZeptoTabs
        tabs={zeptoTabs}
        tabBackgroundColors={zeptoColors}
        defaultActiveIndex={0}
        showSearch
        searchValue={q}
        onSearchChange={setQ}
        searchPlaceholder="Search for “Iphone”"
        style={{ borderRadius: 0 }}
      />


      <Text variant="caption" color={theme.colors.textSecondary}>
        Controlled with icons
      </Text>
      <ZeptoTabs
        tabs={tabsWithIcons}
        tabBackgroundColors={iconTabColors}
        activeIndex={ix}
        onChange={(index: number) => setIx(index)}
      />
      <Text variant="caption" color={theme.colors.textSecondary}>
        Active: {tabsWithIcons[ix]?.label ?? '—'}
      </Text>

      <View style={{ paddingHorizontal: theme.spacing[4], paddingTop: theme.spacing[4] }}>
        <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
          ZeptoTabC
        </Text>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Scrollable category strip: icon above label, bold + black underline when active. Icons are
          MaterialCommunityIcons in this demo.
        </Text>
      </View>
      <ZeptoTabC
        tabs={zeptoTabCItems}
        activeIndex={zeptoTabCIx}
        onChange={(index) => setZeptoTabCIx(index)}
      />
      <Text variant="caption" color={theme.colors.textSecondary} style={{ paddingHorizontal: theme.spacing[4] }}>
        Active: {zeptoTabCItems[zeptoTabCIx]?.label ?? '—'}
      </Text>
    </VStack>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
