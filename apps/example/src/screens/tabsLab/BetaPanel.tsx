import React from 'react';
import {Text, VStack, useTheme} from '@my-ui-lib/core';

export function BetaPanel() {
  const theme = useTheme();
  return (
    <VStack gap={theme.spacing[2]}>
      <Text variant="label">Beta</Text>
      <Text color={theme.colors.textSecondary}>
        Second tab panel: separate module from Alpha so each tab can grow its own UI.
      </Text>
    </VStack>
  );
}
