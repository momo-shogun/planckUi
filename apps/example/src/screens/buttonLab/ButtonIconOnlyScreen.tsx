import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ButtonIconOnly,
  Pressable,
  Text,
  useTheme,
  VStack,
} from '@my-ui-lib/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ButtonLabStackParamList } from '../../navigation/buttonLab/types';

type Props = NativeStackScreenProps<ButtonLabStackParamList, 'ButtonIconOnly'>;

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
        <MaterialCommunityIcons
          name="chevron-left"
          size={22}
          color={theme.colors.textPrimary}
        />
      </Pressable>

      <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
        {title}
      </Text>

      <View style={{ width: 40, height: 40 }} />
    </View>
  );
}

export function ButtonIconOnlyScreen({ navigation }: Props) {
  const theme = useTheme();
  const [active, setActive] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration: 420,
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [active, progress]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
          paddingBottom: theme.spacing[12],
        },
        row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing[3] },
        caption: { marginTop: 2, color: theme.colors.textSecondary },
      }),
    [theme],
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="ButtonIconOnly" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
          Inspired “hamburger” feel
        </Text>
        <Text variant="caption" style={styles.caption}>
          Soft press feedback + optional active state.
        </Text>

        <View style={{ height: theme.spacing[4] }} />

        <View
          style={{
            alignSelf: 'center',
            borderRadius: theme.radii.full,
            padding: theme.spacing[4],
            backgroundColor: '#4c1d95',
          }}
        >
          <ButtonIconOnly
            accessibilityLabel="Toggle menu"
            variant="ghost"
            size="lg"
            active={active}
            pressedBackgroundColor="rgba(255,255,255,0.20)"
            activeBackgroundColor="rgba(255,255,255,0.20)"
            onPress={() => setActive((v) => !v)}
            icon={<AnimatedHamburgerGlyph color="#ffffff" progress={progress} />}
          />
        </View>

        <View style={{ height: theme.spacing[6] }} />

        <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
          Variants
        </Text>

        <View style={{ height: theme.spacing[3] }} />

        <VStack gap={theme.spacing[3]}>
          <View style={styles.row}>
            <ButtonIconOnly
              accessibilityLabel="Settings"
              variant="soft"
              icon={
                <MaterialCommunityIcons
                  name="cog-outline"
                  size={18}
                  color={theme.colors.textPrimary}
                />
              }
              onPress={() => {}}
            />
            <Text>soft</Text>
          </View>

          <View style={styles.row}>
            <ButtonIconOnly
              accessibilityLabel="Bookmark"
              variant="outline"
              icon={
                <MaterialCommunityIcons
                  name="bookmark-outline"
                  size={18}
                  color={theme.colors.textPrimary}
                />
              }
              onPress={() => {}}
            />
            <Text>outline</Text>
          </View>

          <View style={styles.row}>
            <ButtonIconOnly
              accessibilityLabel="Close"
              variant="solid"
              icon={<MaterialCommunityIcons name="close" size={18} color="#ffffff" />}
              onPress={() => {}}
            />
            <Text>solid</Text>
          </View>
        </VStack>
      </ScrollView>
    </View>
  );
}

function AnimatedHamburgerGlyph({
  color,
  progress,
}: {
  color: string;
  progress: Animated.Value;
}) {
  const w = 28;
  const h = 3;
  const r = 2;

  // Closed: top=11, rot=0; Open: top=16, rot=45
  const topY = progress.interpolate({ inputRange: [0, 1], outputRange: [11, 16] });
  const topR = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });

  // Middle: top=16; rot: 0 -> -45
  const midR = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] });

  // Bottom: closed width=14, top=21, left=9, rot=0; open width=28, top=16, left=2, rot=45
  const botW = progress.interpolate({ inputRange: [0, 1], outputRange: [14, 28] });
  const botY = progress.interpolate({ inputRange: [0, 1], outputRange: [21, 16] });
  const botX = progress.interpolate({ inputRange: [0, 1], outputRange: [9, 2] });
  const botR = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });

  return (
    <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: w,
          height: h,
          borderRadius: r,
          backgroundColor: color,
          top: topY,
          transform: [{ rotate: topR }],
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          width: w,
          height: h,
          borderRadius: r,
          backgroundColor: color,
          top: 16,
          transform: [{ rotate: midR }],
          opacity: 1,
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          width: botW,
          height: h,
          borderRadius: r,
          backgroundColor: color,
          top: botY,
          left: botX,
          transform: [{ rotate: botR }],
        }}
      />
    </View>
  );
}

