import React, { useMemo } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from '@my-ui-lib/core';
import type { ButtonLabStackParamList } from '../../navigation/buttonLab/types';

type Props = NativeStackScreenProps<ButtonLabStackParamList, 'ButtonMenu'>;

const VARIANTS = [
  {
    key: 'PillButtonV1' as const,
    title: 'PillButtonV1',
    subtitle: 'Pill CTA button (Pay Now). Gradient is customizable.',
  },
];

export function ButtonMenuScreen({ navigation }: Props) {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
          paddingBottom: theme.spacing[12],
          gap: theme.spacing[3],
        },
        card: {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.lg,
          padding: theme.spacing[4],
        },
        title: {
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.fontWeights.semibold as '600',
          color: theme.colors.textPrimary,
        },
        subtitle: {
          marginTop: 2,
          fontSize: theme.fontSizes.sm,
          color: theme.colors.textSecondary,
        },
      }),
    [theme],
  );

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View>
        <Text variant="heading" style={{ fontSize: theme.fontSizes.xl }}>
          Button
        </Text>
        <Text
          variant="caption"
          color={theme.colors.textSecondary}
          style={{ marginTop: theme.spacing[1] }}
        >
          Tap a variant to preview it.
        </Text>
      </View>

      {VARIANTS.map((v) => (
        <Pressable
          key={v.key}
          accessibilityRole="button"
          accessibilityLabel={`Open ${v.title}`}
          onPress={() => navigation.navigate(v.key)}
          style={({ pressed }) => [
            styles.card,
            pressed && { opacity: 0.75, transform: [{ scale: 0.99 }] },
          ]}
        >
          <Text style={styles.title}>{v.title}</Text>
          <Text style={styles.subtitle}>{v.subtitle}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

