import React, {useState} from 'react';
import {TabPanel, Tabs, Text, VStack, useTheme} from '@my-ui-lib/core';

const tabs = [
  {key: 'left', label: 'Left'},
  {key: 'right', label: 'Right'},
];

export function TabsControlledSection() {
  const theme = useTheme();
  const [activeKey, setActiveKey] = useState('left');
  return (
    <VStack gap={theme.spacing[1]}>
      <Text variant="label">Tabs: controlled</Text>
      <Text variant="caption" color={theme.colors.textSecondary}>
        activeKey and onChange managed by parent state.
      </Text>
      <Tabs
        tabs={tabs}
        activeKey={activeKey}
        onChange={setActiveKey}
        variant="pill">
        <TabPanel tabKey="left">
          <Text color={theme.colors.textSecondary}>Left panel</Text>
        </TabPanel>
        <TabPanel tabKey="right">
          <Text color={theme.colors.textSecondary}>Right panel</Text>
        </TabPanel>
      </Tabs>
      <Text variant="caption" color={theme.colors.textSecondary}>
        Current key: {activeKey}
      </Text>
    </VStack>
  );
}
