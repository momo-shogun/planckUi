import React, {useMemo, useState} from 'react';
import {TabBar, Text, VStack, useTheme} from '@my-ui-lib/core';
import {makePlankBarV1DemoIcon} from './plankBarV1DemoIcons';

export function PlankBarV1Section() {
  const theme = useTheme();
  const [activeKey, setActiveKey] = useState('home');
  const items = useMemo(
    () => [
      {key: 'home', label: 'Home', icon: makePlankBarV1DemoIcon('home', theme)},
      {key: 'search', label: 'Search', icon: makePlankBarV1DemoIcon('search', theme)},
      {key: 'chat', label: 'Chat', icon: makePlankBarV1DemoIcon('chat', theme)},
      {key: 'menu', label: 'Menu', icon: makePlankBarV1DemoIcon('menu', theme)},
    ],
    [theme],
  );

  return (
    <VStack gap={theme.spacing[2]}>
      <Text variant="label">TabBar: Plank Bar V1</Text>
      <Text variant="caption" color={theme.colors.textSecondary}>
        Themed rail (primary family on light pages, slate on dark), pill on the active tab, label
        only when active, muted icons otherwise.
      </Text>
      <TabBar variant="plankBarV1" items={items} activeKey={activeKey} onChange={setActiveKey} testID="plank-bar-v1" />
      <Text variant="caption" color={theme.colors.textSecondary}>
        Active: {activeKey}
      </Text>
    </VStack>
  );
}
