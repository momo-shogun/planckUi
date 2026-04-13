import React, {useMemo, useState} from 'react';
import {TabBar, Text, VStack, useTheme} from '@my-ui-lib/core';
import {makePlankBarV2DemoIcon} from './plankBarV2DemoIcons';

export function PlankBarV2Section() {
  const theme = useTheme();
  const [activeKey, setActiveKey] = useState('home');
  const items = useMemo(
    () => [
      {key: 'home', label: 'Home', icon: makePlankBarV2DemoIcon('home', theme)},
      {key: 'search', label: 'Search', icon: makePlankBarV2DemoIcon('search', theme)},
      {key: 'chat', label: 'Chat', icon: makePlankBarV2DemoIcon('chat', theme)},
      {key: 'menu', label: 'Menu', icon: makePlankBarV2DemoIcon('menu', theme)},
    ],
    [theme],
  );

  return (
    <VStack gap={theme.spacing[2]}>
      <Text variant="label">TabBar: Plank Bar V2</Text>
      <Text variant="caption" color={theme.colors.textSecondary}>
        Floating bubble above a surface bar. The active icon floats in a primary-coloured circle
        with a concave notch; tapping a new tab slides the bubble with a spring.
      </Text>
      <TabBar
        variant="plankBarV2"
        items={items}
        activeKey={activeKey}
        onChange={setActiveKey}
        testID="plank-bar-v2"
      />
      <Text variant="caption" color={theme.colors.textSecondary}>
        Active: {activeKey}
      </Text>
    </VStack>
  );
}
