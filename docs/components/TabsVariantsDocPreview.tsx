import React, { useMemo, useState } from 'react';
import type { TabsVariant } from '@my-ui-lib/tokens';
import { Button, HStack, TabPanel, Tabs, Text, VStack } from '@my-ui-lib/core';
import { Preview } from './Preview';

type DemoMode = TabsVariant | 'scrollable';

const TOKEN_VARIANTS: { id: TabsVariant; label: string; hint: string }[] = [
  {
    id: 'underline',
    label: 'Underline',
    hint: 'Spring-animated indicator line under the active tab (default).',
  },
  {
    id: 'pill',
    label: 'Pill',
    hint: 'Active tab sits on a filled pill that tracks selection.',
  },
  {
    id: 'bordered',
    label: 'Bordered',
    hint: 'Tabs live inside a bordered bar; active state uses token fills.',
  },
];

const SCROLLABLE_HINT =
  'Same tokens as underline, with `scrollable` so many tabs scroll horizontally.';

const MODE_ORDER: { id: DemoMode; label: string }[] = [
  ...TOKEN_VARIANTS.map(({ id, label }) => ({ id, label })),
  { id: 'scrollable', label: 'Scrollable' },
];

const SCROLL_TABS = Array.from({ length: 12 }, (_, i) => ({
  key: `t${i}`,
  label: `Tab ${i + 1}`,
}));

function VariantChips({
  active,
  onSelect,
}: {
  active: DemoMode;
  onSelect: (v: DemoMode) => void;
}) {
  return (
    <HStack gap={8} style={{ flexWrap: 'wrap', marginBottom: 8 }}>
      {MODE_ORDER.map(({ id, label }) => (
        <Button
          key={id}
          size="sm"
          variant={active === id ? 'primary' : 'outline'}
          onPress={() => onSelect(id)}>
          {label}
        </Button>
      ))}
    </HStack>
  );
}

export function TabsVariantsDocPreview() {
  const [mode, setMode] = useState<DemoMode>('underline');

  const hint = useMemo(() => {
    if (mode === 'scrollable') return SCROLLABLE_HINT;
    return TOKEN_VARIANTS.find((v) => v.id === mode)?.hint ?? '';
  }, [mode]);

  const isScrollable = mode === 'scrollable';
  const variant: TabsVariant = isScrollable ? 'underline' : mode;

  return (
    <Preview minHeight={280}>
      <VStack gap={16} align="stretch" style={{ alignSelf: 'stretch', maxWidth: 520, width: '100%' }}>
        <Text variant="body">
          Switch between every built-in Tabs look (underline, pill, bordered) and the scrollable row.
        </Text>
        <VariantChips active={mode} onSelect={setMode} />
        <Text variant="caption">{hint}</Text>
        <Tabs
          tabs={
            isScrollable
              ? SCROLL_TABS
              : [
                  { key: '1', label: 'First' },
                  { key: '2', label: 'Second', badge: 5 },
                  { key: '3', label: 'Third' },
                ]
          }
          defaultActiveKey={isScrollable ? 't0' : '1'}
          variant={variant}
          scrollable={isScrollable}
        >
          {isScrollable ? (
            SCROLL_TABS.map((t) => (
              <TabPanel key={t.key} tabKey={t.key}>
                <Text variant="body">Content for {t.label}</Text>
              </TabPanel>
            ))
          ) : (
            <>
              <TabPanel tabKey="1">
                <Text variant="body">First panel</Text>
              </TabPanel>
              <TabPanel tabKey="2">
                <Text variant="body">Second panel</Text>
              </TabPanel>
              <TabPanel tabKey="3">
                <Text variant="body">Third panel</Text>
              </TabPanel>
            </>
          )}
        </Tabs>
      </VStack>
    </Preview>
  );
}
