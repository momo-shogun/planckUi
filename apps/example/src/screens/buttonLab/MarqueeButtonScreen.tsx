import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MarqueeButton, Pressable, Text, useTheme, VStack } from '@my-ui-lib/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ButtonLabStackParamList } from '../../navigation/buttonLab/types';

type Props = NativeStackScreenProps<ButtonLabStackParamList, 'MarqueeButton'>;

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing[4],
        paddingVertical: theme.spacing[3],
        backgroundColor: theme.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back"
        onPress={onBack}
        slots={{
          root: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.surfaceRaised,
            borderWidth: 1,
            borderColor: theme.colors.border,
          },
        }}
      >
        <MaterialCommunityIcons name="chevron-left" size={22} color={theme.colors.textPrimary} />
      </Pressable>

      <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
        {title}
      </Text>

      <View style={{ width: 40, height: 40 }} />
    </View>
  );
}

export function MarqueeButtonScreen({ navigation }: Props) {
  const theme = useTheme();
  const [dir, setDir] = useState<'left' | 'right'>('left');
  const [speed, setSpeed] = useState(80);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
          paddingBottom: theme.spacing[12],
          gap: theme.spacing[3],
        },
        chipRow: { flexDirection: 'row', gap: theme.spacing[2], flexWrap: 'wrap' },
        chipRowTight: { flexDirection: 'row', gap: theme.spacing[2], flexWrap: 'wrap', alignItems: 'center' },
        chip: {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.full,
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[2],
        },
      }),
    [theme],
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="MarqueeButton" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
            Marquee text
          </Text>
          <Text variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
            Direction, speed, background color, and text color are customizable.
          </Text>
        </View>

        <View style={styles.chipRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll left"
            onPress={() => setDir('left')}
            slots={{
              root:
                dir === 'left'
                  ? [styles.chip, { backgroundColor: theme.colors.surfaceRaised }]
                  : styles.chip,
            }}
          >
            <Text>Left</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll right"
            onPress={() => setDir('right')}
            slots={{
              root:
                dir === 'right'
                  ? [styles.chip, { backgroundColor: theme.colors.surfaceRaised }]
                  : styles.chip,
            }}
          >
            <Text>Right</Text>
          </Pressable>
        </View>

        <View style={styles.chipRowTight}>
          <Text variant="caption" color={theme.colors.textSecondary}>
            Speed
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Decrease speed"
            onPress={() => setSpeed((s) => Math.max(20, s - 10))}
            slots={{ root: styles.chip }}
          >
            <Text>-</Text>
          </Pressable>
          <Text style={{ minWidth: 52, textAlign: 'center' }}>{speed}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Increase speed"
            onPress={() => setSpeed((s) => Math.min(220, s + 10))}
            slots={{ root: styles.chip }}
          >
            <Text>+</Text>
          </Pressable>
          <Text variant="caption" color={theme.colors.textSecondary}>
            px/s
          </Text>
        </View>

        <VStack gap={theme.spacing[3]}>
          <MarqueeButton
            text="START YOUR JOURNEY! • START YOUR JOURNEY! • START YOUR JOURNEY!"
            direction={dir}
            speedPxPerSec={speed}
            backgroundColor="#a5b4fc"
            textColor="#1e1b4b"
            onPress={() => {}}
          />
        </VStack>
      </ScrollView>
    </View>
  );
}

