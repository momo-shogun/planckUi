import React, {useMemo, useState} from 'react';
import {TabBar, Text, VStack, useTheme} from '@my-ui-lib/core';
import {tabBarDemoIcon} from './tabBarDemoIcon';

export function TabBarVariantsSection() {
  const theme = useTheme();
  const items = useMemo(
    () => [
      {key: 'home', label: 'Home', icon: tabBarDemoIcon(theme, 'circle')},
      {key: 'star', label: 'Star', icon: tabBarDemoIcon(theme, 'square')},
    ],
    [theme],
  );
  const [defaultKey, setDefaultKey] = useState('home');
  const [floatingKey, setFloatingKey] = useState('home');
  const [minimalKey, setMinimalKey] = useState('home');

  return (
    <VStack gap={theme.spacing[4]}>
      <Text variant="label">TabBar: default</Text>
      <TabBar variant="default" items={items} activeKey={defaultKey} onChange={setDefaultKey} />
      <Text variant="caption" color={theme.colors.textSecondary}>
        Active: {defaultKey}
      </Text>

      <Text variant="label">TabBar: floating</Text>
      <TabBar variant="floating" items={items} activeKey={floatingKey} onChange={setFloatingKey} />
      <Text variant="caption" color={theme.colors.textSecondary}>
        Active: {floatingKey}
      </Text>

      <Text variant="label">TabBar: minimal</Text>
      <TabBar variant="minimal" items={items} activeKey={minimalKey} onChange={setMinimalKey} />
      <Text variant="caption" color={theme.colors.textSecondary}>
        Active: {minimalKey}
      </Text>
    </VStack>
  );
}
