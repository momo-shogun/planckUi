import React from 'react';
import {TabPanel, Tabs, Text, VStack, useTheme} from '@my-ui-lib/core';
import {AlphaPanel} from './AlphaPanel';
import {BetaPanel} from './BetaPanel';

const pairTabs = [
  {key: 'a', label: 'Alpha'},
  {key: 'b', label: 'Beta', badge: 3},
];

export function TabsVariantsSection() {
  const theme = useTheme();
  return (
    <VStack gap={theme.spacing[4]}>
      <VStack gap={theme.spacing[1]}>
        <Text variant="label">Tabs: underline</Text>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Default variant; indicator under the active tab.
        </Text>
        <Tabs tabs={pairTabs} defaultActiveKey="a" variant="underline">
          <TabPanel tabKey="a">
            <Text color={theme.colors.textSecondary}>Underline panel A</Text>
          </TabPanel>
          <TabPanel tabKey="b">
            <Text color={theme.colors.textSecondary}>Underline panel B</Text>
          </TabPanel>
        </Tabs>
      </VStack>
      <VStack gap={theme.spacing[1]}>
        <Text variant="label">Tabs: pill</Text>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Rounded segment control style.
        </Text>
        <Tabs tabs={pairTabs} defaultActiveKey="a" variant="pill">
          <TabPanel tabKey="a">
            <AlphaPanel />
          </TabPanel>
          <TabPanel tabKey="b">
            <BetaPanel />
          </TabPanel>
        </Tabs>
      </VStack>
      <VStack gap={theme.spacing[1]}>
        <Text variant="label">Tabs: bordered</Text>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Bordered tab list + content region.
        </Text>
        <Tabs tabs={pairTabs} defaultActiveKey="a" variant="bordered">
          <TabPanel tabKey="a">
            <Text color={theme.colors.textSecondary}>Bordered panel A</Text>
          </TabPanel>
          <TabPanel tabKey="b">
            <Text color={theme.colors.textSecondary}>Bordered panel B</Text>
          </TabPanel>
        </Tabs>
      </VStack>
    </VStack>
  );
}
