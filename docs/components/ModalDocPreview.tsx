import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text, VStack } from '@my-ui-lib/core';
import { Preview } from './Preview';

export function ModalDocPreview() {
  const [visible, setVisible] = useState(false);

  return (
    <Preview minHeight={200}>
      <VStack gap={12} align="center">
        <Button variant="primary" onPress={() => setVisible(true)}>
          Open modal
        </Button>
        <Modal visible={visible} onClose={() => setVisible(false)} size="md">
          <ModalHeader>Example dialog</ModalHeader>
          <ModalBody>
            <Text variant="body">Portal + spring/timing animations; backdrop calls onClose.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onPress={() => setVisible(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </VStack>
    </Preview>
  );
}
