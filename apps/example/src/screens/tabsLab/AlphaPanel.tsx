import React from 'react';
import {Input, Text, VStack, useTheme} from '@my-ui-lib/core';

export function AlphaPanel() {
  const theme = useTheme();
  return (
    <VStack gap={theme.spacing[2]}>
      <Text variant="label">Alpha</Text>
      <Text color={theme.colors.textSecondary}>
        First tab panel: use this area for primary content or a default view.
      </Text>
      <Input label="Inline field" placeholder="Tab-scoped UI" disabled />
    </VStack>
  );
}
