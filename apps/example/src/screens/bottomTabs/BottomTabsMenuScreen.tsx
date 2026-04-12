import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text, VStack, useTheme} from '@my-ui-lib/core';
import type {BottomTabsLabStackParamList} from '../../navigation/bottomTabsLab/types';

type Props = NativeStackScreenProps<BottomTabsLabStackParamList, 'BottomTabsMenu'>;

const PRESETS: Array<{
  key: keyof Omit<BottomTabsLabStackParamList, 'BottomTabsMenu'>;
  title: string;
  subtitle: string;
}> = [
  {
    key: 'PresetDefault',
    title: 'Default tab bar',
    subtitle: 'Icons + labels, active / inactive tint from theme.',
  },
  {
    key: 'PresetIconsOnly',
    title: 'Icons only',
    subtitle: 'tabBarShowLabel: false',
  },
  {
    key: 'PresetBadges',
    title: 'Badges',
    subtitle: 'tabBarBadge on Profile and Settings.',
  },
  {
    key: 'PresetBesideIcon',
    title: 'Label beside icon',
    subtitle: 'tabBarLabelPosition: beside-icon',
  },
  {
    key: 'PresetStyledBar',
    title: 'Styled tab bar',
    subtitle: 'tabBarStyle height, surface background, top border.',
  },
  {
    key: 'PresetActiveBackground',
    title: 'Active tab background',
    subtitle: 'tabBarActiveBackgroundColor / inactive transparent.',
  },
  {
    key: 'PresetHideKeyboard',
    title: 'Hide bar with keyboard',
    subtitle: 'tabBarHideOnKeyboard: true',
  },
  {
    key: 'PresetEager',
    title: 'Eager (not lazy)',
    subtitle: 'lazy: false on each tab — screens mount immediately.',
  },
  {
    key: 'PresetPlanckBar',
    title: 'Custom tabBar (Planck TabBar)',
    subtitle: 'tabBar prop bridging React Navigation state.',
  },
  {
    key: 'PresetPlankBarV1',
    title: 'Plank Bar V1',
    subtitle: 'Planck TabBar variant: dark bar, white pill, label only on active tab.',
  },
];

export function BottomTabsMenuScreen({navigation}: Props) {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
        paddingBottom: theme.spacing[8],
      }}>
      {/* <Text variant="heading" style={{marginBottom: theme.spacing[2]}}>
        Bottom tabs lab
      </Text> */}
      <Text color={theme.colors.textSecondary} style={{marginBottom: theme.spacing[4]}}>
        React Navigation bottom tab presets. Icons use View primitives and tabBarIcon so they
        render without a vector icon font.
      </Text>
      <VStack gap={theme.spacing[2]}>
        {PRESETS.map(p => (
          <View key={p.key}>
            <Button variant="outline" onPress={() => navigation.navigate(p.key)}>
              {p.title}
            </Button>
            <Text variant="caption" color={theme.colors.textSecondary} style={{marginTop: 4}}>
              {p.subtitle}
            </Text>
          </View>
        ))}
      </VStack>
    </ScrollView>
  );
}
