import React, { useState } from 'react';
import { ComposerInput, VStack } from '@my-ui-lib/core';
import { Preview } from './Preview';

export function ComposerInputDocPreview() {
  const [value, setValue] = useState('');

  return (
    <Preview minHeight={200}>
      <VStack gap={12} align="stretch" style={{ width: '100%', maxWidth: 720 }}>
        <ComposerInput
          value={value}
          onChangeText={setValue}
          chips={[
            { id: 'gmail', label: 'Gmail', count: 2 },
            { id: 'drive', label: 'Drive' },
          ]}
          onPressAdd={() => {}}
          onPressChip={() => {}}
          onPressMic={() => {}}
          onPressSend={() => {}}
        />
      </VStack>
    </Preview>
  );
}

