import React from 'react';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  PlankImgBgV1,
  Pressable,
  Text,
  useTheme,
} from '@my-ui-lib/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { CardsLabStackParamList } from '../../navigation/cardsLab/types';

type Props = NativeStackScreenProps<CardsLabStackParamList, 'PlankImgBgV1'>;

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

export function PlankImgBgV1Screen({ navigation }: Props) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="PlankImgBgV1" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
          paddingBottom: theme.spacing[12],
          gap: theme.spacing[4],
          alignItems: 'center',
        }}
      >
        <View style={{ alignSelf: 'stretch' }}>
          <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
            PlankImgBgV1
          </Text>
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            style={{ marginTop: 2 }}
          >
            Image background card with tags, avatars and a footer pill.
          </Text>
        </View>

        <PlankImgBgV1
          title="Gymshark Opening Weekend!"
          subtitle="Hosted by DFYNE, Gymshark, Squat Wolf, Woman’s Best"
          joinedText="120 joined"
          tagLeft={{
            label: 'Global',
            icon: (
              <MaterialCommunityIcons
                name="earth"
                size={14}
                color="rgba(255,255,255,0.92)"
              />
            ),
          }}
          tagRight={{
            label: '2d',
            icon: (
              <MaterialCommunityIcons
                name="clock-outline"
                size={14}
                color="rgba(255,255,255,0.92)"
              />
            ),
            backgroundColor: 'rgba(239,68,68,0.88)',
          }}
          footerIcon={
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,0.20)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="flash"
                size={16}
                color="#ffffff"
              />
            </View>
          }
          footerText="3 arenas"
        />
      </ScrollView>
    </View>
  );
}

