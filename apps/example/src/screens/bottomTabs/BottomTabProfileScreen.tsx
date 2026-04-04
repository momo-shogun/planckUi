import React from 'react';
import {ScrollView} from 'react-native';
import {Text, useTheme} from '@my-ui-lib/core';

export function BottomTabProfileScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
      }}>
      <Text variant="heading">Profile</Text>
      <Text color={theme.colors.textSecondary} style={{marginTop: theme.spacing[2]}}>
        Second tab — swap for real profile UI when you polish this example.
      </Text>
    </ScrollView>
  );
}
