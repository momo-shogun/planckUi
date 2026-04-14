import React, { useMemo, useState } from 'react';
import { View } from 'react-native-web';
import {
  Button,
  Dropdown,
  DropdownMenu,
  HStack,
  MultiSelect,
  Text,
  VStack,
} from '@my-ui-lib/core';
import { Preview } from './Preview';

const items = [
  { id: 'one', label: 'First option' },
  { id: 'two', label: 'Second option' },
  { id: 'three', label: 'Third (disabled)', disabled: true },
];

type Variant =
  | 'basic'
  | 'multi'
  | 'search'
  | 'controlled'
  | 'renderItem'
  | 'styling'
  | 'defaultValue';

const VARIANTS: { id: Variant; label: string }[] = [
  { id: 'basic', label: 'Basic (Dropdown)' },
  { id: 'multi', label: 'MultiSelect' },
  { id: 'search', label: 'Searchable' },
  { id: 'controlled', label: 'Controlled' },
  { id: 'renderItem', label: 'Custom row' },
  { id: 'styling', label: 'style / containerStyle' },
  { id: 'defaultValue', label: 'defaultValue' },
];

function VariantChips({
  active,
  onSelect,
}: {
  active: Variant;
  onSelect: (v: Variant) => void;
}) {
  return (
    <HStack gap={8} style={{ flexWrap: 'wrap', marginBottom: 8 }}>
      {VARIANTS.map(({ id, label }) => (
        <Button
          key={id}
          size="sm"
          variant={active === id ? 'primary' : 'outline'}
          onPress={() => onSelect(id)}>
          {label}
        </Button>
      ))}
    </HStack>
  );
}

function ControlledDemo() {
  const [value, setValue] = useState<string | undefined>();
  return (
    <VStack gap={8} align="stretch">
      <Text variant="caption">
        value: {value === undefined ? 'undefined' : JSON.stringify(value)} — pick an option to update
        state.
      </Text>
      <DropdownMenu
        items={items}
        value={value}
        onValueChange={setValue}
        placeholder="Controlled single select"
        testID="docs-variant-controlled"
      />
    </VStack>
  );
}

function DefaultValueDemo() {
  return (
    <DropdownMenu
      key="default-value-demo"
      items={items}
      defaultValue="two"
      placeholder="Should start on Second"
      testID="docs-variant-default"
    />
  );
}

export function DropdownVariantsDocPreview() {
  const [variant, setVariant] = useState<Variant>('basic');

  const panel = useMemo(() => {
    switch (variant) {
      case 'basic':
        return (
          <VStack gap={8} align="stretch">
            <Text variant="caption">
              Dropdown is an alias for DropdownMenu — single selection, anchored list.
            </Text>
            <Dropdown items={items} placeholder="Basic select" testID="docs-variant-basic" />
          </VStack>
        );
      case 'multi':
        return (
          <VStack gap={8} align="stretch">
            <Text variant="caption">
              MultiSelect keeps the menu open; tap items to toggle. Trigger shows comma-separated
              labels.
            </Text>
            <MultiSelect items={items} placeholder="Pick one or more" testID="docs-variant-multi" />
          </VStack>
        );
      case 'search':
        return (
          <DropdownMenu
            items={items}
            search
            searchPlaceholder="Type to filter…"
            placeholder="Searchable list"
            testID="docs-variant-search"
          />
        );
      case 'controlled':
        return <ControlledDemo />;
      case 'renderItem':
        return (
          <DropdownMenu
            items={items}
            placeholder="Custom rows"
            renderItem={(item, { selected }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text variant="body">{selected ? '●' : '○'}</Text>
                <Text variant="body" style={{ flex: 1 }}>
                  {item.label}
                </Text>
              </View>
            )}
            testID="docs-variant-render"
          />
        );
      case 'styling':
        return (
          <VStack gap={8} align="stretch">
            <Text variant="caption">
              style on the root wrapper; containerStyle on the floating list panel.
            </Text>
            <DropdownMenu
              items={items}
              placeholder="Themed borders"
              style={{
                borderWidth: 2,
                borderColor: '#7c3aed',
                borderRadius: 12,
                padding: 4,
              }}
              containerStyle={{
                borderWidth: 2,
                borderColor: '#a855f7',
                backgroundColor: '#faf5ff',
              }}
              testID="docs-variant-style"
            />
          </VStack>
        );
      case 'defaultValue':
        return (
          <VStack gap={8} align="stretch">
            <Text variant="caption">
              Uncontrolled with defaultValue two — trigger shows Second option.
            </Text>
            <DefaultValueDemo />
          </VStack>
        );
      default:
        return null;
    }
  }, [variant]);

  return (
    <Preview minHeight={320}>
      <VStack gap={16} align="stretch" style={{ alignSelf: 'stretch', maxWidth: 420 }}>
        <Text variant="body">Choose a variant to preview the API.</Text>
        <VariantChips active={variant} onSelect={setVariant} />
        {panel}
      </VStack>
    </Preview>
  );
}
