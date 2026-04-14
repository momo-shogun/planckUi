import React, { useMemo, useState } from 'react';
import { View } from 'react-native-web';
import { TabBar, useTheme } from '@my-ui-lib/core';
import { getPlankBarV1Chrome } from '@my-ui-lib/tokens';
import { Preview } from './Preview';
import { PlankBarV1PreviewIcon, type PlankPreviewIconKind } from './plankBarV1PreviewIcons';

/**
 * Web preview of Planck `TabBar` **plankBarV1** (react-native-web).
 * Icons are inline SVG data-URIs so Next.js does not bundle `react-native-svg` codegen.
 * The example app uses **react-native-vector-icons** (MaterialCommunityIcons) for the same tabs on device.
 */
export function BottomTabsLabPatternPreview() {
  const theme = useTheme();
  const chrome = useMemo(() => getPlankBarV1Chrome(theme), [theme]);
  const items = useMemo(
    () =>
      (['Home', 'Search', 'Chat', 'Menu'] as const).map(name => ({
        key: name,
        label: name,
        icon: (active: boolean) => (
          <PlankBarV1PreviewIcon
            kind={name.toLowerCase() as PlankPreviewIconKind}
            stroke={active ? chrome.activeFg : chrome.inactiveIcon}
          />
        ),
      })),
    [chrome],
  );
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
            items={items}
          />
        </View>
      </View>
    </Preview>
  );
}
