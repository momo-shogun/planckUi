import React from 'react';
import {ScrollView} from 'react-native';
import {Text, useTheme} from '@my-ui-lib/core';

export function BottomTabMenuScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
      }}>
      <Text variant="heading">Menu</Text>
      <Text color={theme.colors.textSecondary} style={{marginTop: theme.spacing[2]}}>
        Plank Bar V1 — menu tab placeholder.
      </Text>
    </ScrollView>
  );
}
