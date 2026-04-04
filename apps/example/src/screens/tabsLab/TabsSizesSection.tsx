import React from 'react';
import {TabPanel, Tabs, Text, VStack, useTheme} from '@my-ui-lib/core';

const twoTabs = [
  {key: 'x', label: 'One'},
  {key: 'y', label: 'Two'},
];

export function TabsSizesSection() {
  const theme = useTheme();
  return (
    <VStack gap={theme.spacing[3]}>
      <Text variant="label">Tabs: sizes (underline)</Text>
      <Text variant="caption" color={theme.colors.textSecondary}>
        sm, md, and lg tab triggers with the same two panels.
      </Text>
      {(['sm', 'md', 'lg'] as const).map(size => (
        <VStack key={size} gap={theme.spacing[1]}>
          <Text variant="caption" color={theme.colors.textSecondary}>
            size=&quot;{size}&quot;
          </Text>
          <Tabs tabs={twoTabs} defaultActiveKey="x" variant="underline" size={size}>
            <TabPanel tabKey="x">
              <Text color={theme.colors.textSecondary}>Content for {size} / One</Text>
            </TabPanel>
            <TabPanel tabKey="y">
              <Text color={theme.colors.textSecondary}>Content for {size} / Two</Text>
            </TabPanel>
          </Tabs>
        </VStack>
      ))}
    </VStack>
  );
}
