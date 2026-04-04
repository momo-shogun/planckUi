import React from 'react';
import { DropdownMenu, Text, VStack } from '@my-ui-lib/core';
import { Preview } from './Preview';

const items = [
  { id: 'one', label: 'First option' },
  { id: 'two', label: 'Second option' },
  { id: 'three', label: 'Third (disabled)', disabled: true },
];

export function DropdownMenuDocPreview() {
  return (
    <Preview minHeight={280}>
      <VStack gap={20} align="stretch" style={{ alignSelf: 'stretch', maxWidth: 360 }}>
        <Text variant="body">
          Anchored mode keeps the list aligned to the trigger width and flips above when there is not enough
          room below. Search filters the list in place.
        </Text>
        <DropdownMenu
          items={items}
          placeholder="Anchored + search"
          search
          searchPlaceholder="Filter…"
          testID="docs-dropdown-anchored"
        />
        <Text variant="body">
          Modal mode centers a compact panel (similar to react-native-element-dropdown modal mode).
        </Text>
        <DropdownMenu
          mode="modal"
          items={items}
          placeholder="Modal presentation"
          testID="docs-dropdown-modal"
        />
      </VStack>
    </Preview>
  );
}
