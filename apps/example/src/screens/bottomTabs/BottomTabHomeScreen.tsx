import React from 'react';
import {ScrollView} from 'react-native';
import {Text, useTheme} from '@my-ui-lib/core';

export function BottomTabHomeScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
      }}>
      <Text variant="heading">Home</Text>
      <Text color={theme.colors.textSecondary} style={{marginTop: theme.spacing[2]}}>
        React Navigation bottom tabs — screens are lazy-mounted on first focus (see React Navigation
        docs).
      </Text>
    </ScrollView>
  );
}
