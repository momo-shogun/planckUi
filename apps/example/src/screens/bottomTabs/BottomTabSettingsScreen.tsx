import React from 'react';
import {ScrollView} from 'react-native';
import {Text, useTheme} from '@my-ui-lib/core';

export function BottomTabSettingsScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
      }}>
      <Text variant="heading">Settings</Text>
      <Text color={theme.colors.textSecondary} style={{marginTop: theme.spacing[2]}}>
        Third tab — nested under the drawer like a typical app shell.
      </Text>
    </ScrollView>
  );
}
