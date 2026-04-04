import React from 'react';
import { Button, Text, useToast, VStack } from '@my-ui-lib/core';
import { Preview } from './Preview';

function ToastButtons() {
  const { showToast } = useToast();
  return (
    <VStack gap={8} align="center">
      <Button variant="primary" onPress={() => showToast({ title: 'Saved', intent: 'success' })}>
        Success toast
      </Button>
      <Text variant="caption">Queue holds up to three toasts.</Text>
    </VStack>
  );
}

export function ToastDocPreview() {
  return (
    <Preview minHeight={160}>
      <ToastButtons />
    </Preview>
  );
}
