import React from 'react';
import { View } from 'react-native';
import { MarqueeButton, Text, VStack, useTheme } from '@my-ui-lib/core';
import { Preview } from './Preview';

export function MarqueeButtonDocPreview() {
  const theme = useTheme();
  return (
    <Preview minHeight={160} themeSwitcher>
      <VStack gap={theme.spacing[3]} style={{ alignSelf: 'stretch' }}>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Uses <strong>Reanimated</strong> in native apps; this docs preview uses a web mock (motion
          may differ).
        </Text>
        <View style={{ maxWidth: 320, alignSelf: 'flex-start' }}>
          <MarqueeButton
            text="Long label that scrolls inside the pill — tap to trigger onPress"
            onPress={() => {}}
            speedPxPerSec={48}
          />
        </View>
      </VStack>
    </Preview>
  );
}
