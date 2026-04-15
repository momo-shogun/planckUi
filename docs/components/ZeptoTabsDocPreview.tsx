import React, { useMemo, useState } from 'react';
import { View } from 'react-native-web';
import { Text, VStack } from '@my-ui-lib/core';
import { ZeptoTabs } from '@my-ui-lib/core/zepto-tabs';
import { Preview } from './Preview';

const tabs = [
  { id: 'a', label: 'Electronics' },
  { id: 'b', label: 'Fashion' },
  { id: 'c', label: 'Home & Living' },
];

const colors = ['#EDE7FF', '#E7F4FF', '#EAF7EF'] as const;

export function ZeptoTabsDocPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState('');

  const activeLabel = useMemo(
    () => tabs[activeIndex]?.label ?? '—',
    [activeIndex]
  );

  return (
    <Preview minHeight={320}>
      <View style={{ width: '100%', maxWidth: 520 }}>
        <VStack gap={12} align="stretch">
          <Text variant="caption">active: {activeLabel}</Text>
          <ZeptoTabs
            tabs={tabs}
            tabBackgroundColors={colors as unknown as string[]}
            activeIndex={activeIndex}
            onChange={(idx) => setActiveIndex(idx)}
            showSearch
            searchPlaceholder="Search…"
            searchValue={search}
            onSearchChange={setSearch}
            testID="docs-zepto-tabs"
          />
        </VStack>
      </View>
    </Preview>
  );
}

