import React from 'react';
import { View } from 'react-native';
import { Button, ButtonIconOnly, HStack, PillButtonV1, Text, VStack, useTheme } from '@my-ui-lib/core';
import { Preview } from './Preview';

function DotIcon({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: color,
      }}
    />
  );
}

export function PillButtonDocPreview() {
  const theme = useTheme();
  return (
    <Preview minHeight={200} themeSwitcher>
      <VStack gap={theme.spacing[3]} style={{ alignSelf: 'stretch' }}>
        <Text variant="caption" color={theme.colors.textSecondary}>
          <code>PillButtonV1</code> — same component is exported as <code>Button</code>.
        </Text>
        <View style={{ alignSelf: 'stretch' }}>
          <HStack gap={theme.spacing[2]} style={{ flexWrap: 'wrap' }}>
          <PillButtonV1 variant="default" onPress={() => {}}>
            Default
          </PillButtonV1>
          <PillButtonV1 variant="secondary" onPress={() => {}}>
            Secondary
          </PillButtonV1>
          <PillButtonV1 variant="outline" onPress={() => {}}>
            Outline
          </PillButtonV1>
          <PillButtonV1 variant="ghost" onPress={() => {}}>
            Ghost
          </PillButtonV1>
          </HStack>
        </View>
        <View style={{ alignSelf: 'stretch' }}>
          <HStack gap={theme.spacing[2]} style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="default" size="sm" onPress={() => {}}>
            Button alias (sm)
          </Button>
          <PillButtonV1 variant="default" loading onPress={() => {}}>
            Loading
          </PillButtonV1>
          <PillButtonV1 variant="default" disabled onPress={() => {}}>
            Disabled
          </PillButtonV1>
          </HStack>
        </View>
      </VStack>
    </Preview>
  );
}

export function ButtonIconOnlyDocPreview() {
  const theme = useTheme();
  return (
    <Preview minHeight={180} themeSwitcher>
      <VStack gap={theme.spacing[3]} style={{ alignSelf: 'stretch' }}>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Icon slot + variants (ghost, soft, outline, solid) and sizes.
        </Text>
        <View style={{ alignSelf: 'stretch' }}>
          <HStack gap={theme.spacing[2]} style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <ButtonIconOnly
            accessibilityLabel="Ghost"
            variant="ghost"
            icon={<DotIcon color={theme.colors.textPrimary} />}
            onPress={() => {}}
          />
          <ButtonIconOnly
            accessibilityLabel="Soft"
            variant="soft"
            icon={<DotIcon color="#6366F1" />}
            onPress={() => {}}
          />
          <ButtonIconOnly
            accessibilityLabel="Outline"
            variant="outline"
            icon={<DotIcon color="#22C55E" />}
            onPress={() => {}}
          />
          <ButtonIconOnly
            accessibilityLabel="Solid"
            variant="solid"
            icon={<DotIcon color="#ffffff" />}
            onPress={() => {}}
          />
          </HStack>
        </View>
        <View style={{ alignSelf: 'stretch' }}>
          <HStack gap={theme.spacing[2]} style={{ alignItems: 'center' }}>
          <ButtonIconOnly size="sm" variant="soft" icon={<DotIcon color="#111" />} onPress={() => {}} />
          <ButtonIconOnly size="md" variant="soft" icon={<DotIcon color="#111" />} onPress={() => {}} />
          <ButtonIconOnly size="lg" variant="soft" icon={<DotIcon color="#111" />} onPress={() => {}} />
          </HStack>
        </View>
      </VStack>
    </Preview>
  );
}
