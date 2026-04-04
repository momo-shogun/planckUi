import React from 'react';
import {TabPanel, Tabs, Text, VStack, useTheme} from '@my-ui-lib/core';

const manyTabs = [
  {key: 't1', label: 'Mon'},
  {key: 't2', label: 'Tue'},
  {key: 't3', label: 'Wed'},
  {key: 't4', label: 'Thu'},
  {key: 't5', label: 'Fri'},
  {key: 't6', label: 'Sat'},
  {key: 't7', label: 'Sun'},
];

export function TabsScrollableSection() {
  const theme = useTheme();
  return (
    <VStack gap={theme.spacing[1]}>
      <Text variant="label">Tabs: scrollable</Text>
      <Text variant="caption" color={theme.colors.textSecondary}>
        scrollable with seven tabs; swipe or tap the strip horizontally.
      </Text>
      <Tabs tabs={manyTabs} defaultActiveKey="t1" variant="underline" scrollable>
        {manyTabs.map(t => (
          <TabPanel key={t.key} tabKey={t.key}>
            <Text color={theme.colors.textSecondary}>Panel for {t.label}</Text>
          </TabPanel>
        ))}
      </Tabs>
    </VStack>
  );
}
