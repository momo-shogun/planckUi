import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Text as PlanckText, useTheme} from '@my-ui-lib/core';
import type {BottomTabsLabStackParamList} from '../../navigation/bottomTabsLab/types';

type Props = NativeStackScreenProps<BottomTabsLabStackParamList, 'BottomTabsMenu'>;

const PRESETS: Array<{
  key: keyof BottomTabsLabStackParamList;
  title: string;
  subtitle: string;
}> = [
  {
    key: 'PresetPlankBarV1',
    title: 'Plank Bar V1',
    subtitle: 'Planck TabBar variant with dock-style icons.',
  },
];

export function BottomTabsMenuScreen({navigation}: Props) {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[styles.container, {backgroundColor: theme.colors.background, padding: theme.spacing[4]}]}>
      <PlanckText variant="heading" style={{marginBottom: theme.spacing[2]}}>
        Bottom tabs lab
      </PlanckText>
      <PlanckText color={theme.colors.textSecondary} style={{marginBottom: theme.spacing[4]}}>
        Open the Plank Bar V1 preset. More custom bars can be listed here later.
      </PlanckText>

      {PRESETS.map(row => (
        <Pressable
          key={row.key}
          accessibilityRole="button"
          onPress={() => navigation.navigate(row.key)}
          style={({pressed}) => [
            styles.card,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              opacity: pressed ? 0.92 : 1,
            },
          ]}>
          <View style={styles.cardText}>
            <PlanckText variant="heading">{row.title}</PlanckText>
            <PlanckText color={theme.colors.textSecondary} style={{marginTop: theme.spacing[1]}}>
              {row.subtitle}
            </PlanckText>
          </View>
          <Text style={[styles.chevron, {color: theme.colors.textSecondary}]}>›</Text>
        </Pressable>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  cardText: {
    flex: 1,
    paddingRight: 8,
  },
  chevron: {
    fontSize: 22,
    fontWeight: '300',
  },
});
