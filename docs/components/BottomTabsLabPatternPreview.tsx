import React, { useState } from 'react';
import { View } from 'react-native';
import { PLANK_BAR_V1, TabBar } from '@my-ui-lib/core';
import { Preview } from './Preview';

function PlankIcon({ active }: { active: boolean }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: active ? PLANK_BAR_V1.activeFg : PLANK_BAR_V1.inactiveIcon,
        opacity: active ? 1 : 0.9,
      }}
    />
  );
}

const items = [
  { key: 'Home', label: 'Home', icon: (active: boolean) => <PlankIcon active={active} /> },
  { key: 'Search', label: 'Search', icon: (active: boolean) => <PlankIcon active={active} /> },
  { key: 'Chat', label: 'Chat', icon: (active: boolean) => <PlankIcon active={active} /> },
  { key: 'Menu', label: 'Menu', icon: (active: boolean) => <PlankIcon active={active} /> },
] as const;

/**
 * Web preview of Planck `TabBar` **plankBarV1** — same variant the example app uses with React Navigation.
 */
export function BottomTabsLabPatternPreview() {
  const [activeKey, setActiveKey] = useState<string>('Home');

  return (
    <Preview minHeight={260}>
      <View
        style={{
          alignSelf: 'stretch',
          width: '100%',
          maxWidth: 440,
          minHeight: 200,
          justifyContent: 'flex-end',
        }}>
        <View style={{ paddingHorizontal: 12, paddingBottom: 12, width: '100%' }}>
          <TabBar
            variant="plankBarV1"
            activeKey={activeKey}
            onChange={setActiveKey}
            items={[...items]}
          />
        </View>
      </View>
    </Preview>
  );
}
