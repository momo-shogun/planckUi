import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { TabBar, Text, useTheme } from '@my-ui-lib/core';
import { getPlankBarV1Chrome, getPlankBarV2Chrome } from '@my-ui-lib/tokens';
import { Preview } from './Preview';
import { PlankBarV1PreviewIcon, type PlankPreviewIconKind } from './plankBarV1PreviewIcons';

const TAB_NAMES = ['Home', 'Search', 'Chat', 'Menu'] as const;

function makeItems(
  activeFg: string,
  inactiveIcon: string
): Array<{
  key: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}> {
  return TAB_NAMES.map((name) => ({
    key: name,
    label: name,
    icon: (active: boolean) => (
      <PlankBarV1PreviewIcon
        kind={name.toLowerCase() as PlankPreviewIconKind}
        stroke={active ? activeFg : inactiveIcon}
      />
    ),
  }));
}

export function BottomTabVariantsDocPreview() {
  const theme = useTheme();
  const plankV1 = useMemo(() => getPlankBarV1Chrome(theme), [theme]);
  const plankV2 = useMemo(() => getPlankBarV2Chrome(theme), [theme]);

  const v1Items = useMemo(
    () => makeItems(plankV1.activeFg, plankV1.inactiveIcon),
    [plankV1]
  );
  const v2Items = useMemo(
    () => makeItems(plankV2.activeFg, plankV2.inactiveIcon),
    [plankV2]
  );

  const [v1ActiveKey, setV1ActiveKey] = useState<string>('Home');
  const [v2ActiveKey, setV2ActiveKey] = useState<string>('Home');

  return (
    <Preview minHeight={440}>
      <View style={{ width: '100%', maxWidth: 480 }}>
        <View style={{ marginBottom: 28 }}>
          <Text variant="label" style={{ marginBottom: 8 }}>
            Bottom Tab: Plank Bar V1
          </Text>
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            style={{ marginBottom: 12 }}
          >
            Dock-style active pill with themed rail and muted inactive icons.
          </Text>
          <TabBar
            variant="plankBarV1"
            activeKey={v1ActiveKey}
            onChange={setV1ActiveKey}
            items={v1Items}
          />
        </View>

        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>
            Bottom Tab: Plank Bar V2
          </Text>
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            style={{ marginBottom: 12 }}
          >
            Floating bubble tab with a moving notch and spring transition.
          </Text>
          <TabBar
            variant="plankBarV2"
            activeKey={v2ActiveKey}
            onChange={setV2ActiveKey}
            items={v2Items}
          />
        </View>
      </View>
    </Preview>
  );
}
