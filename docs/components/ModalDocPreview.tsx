import React, { useState } from 'react';
import { Button, Modal, Text, VStack } from '@my-ui-lib/core';
import { Preview } from './Preview';

export function ModalDocPreview() {
  const [open, setOpen] = useState(false);

  return (
    <Preview minHeight={200}>
      <VStack gap={12} align="center">
        <Button variant="primary" onPress={() => setOpen(true)}>
          Open modal
        </Button>
        <Modal
          open={open}
          title="Example dialog"
          onRequestClose={() => setOpen(false)}>
          <Text variant="body">Themed overlay and surface from your active theme.</Text>
          <Button variant="outline" onPress={() => setOpen(false)}>
            Close
          </Button>
        </Modal>
      </VStack>
    </Preview>
  );
}
