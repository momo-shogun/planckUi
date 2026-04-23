import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MPCard, Text, Pressable, useTheme } from '@my-ui-lib/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { CardsLabStackParamList } from '../../navigation/cardsLab/types';

type Props = NativeStackScreenProps<CardsLabStackParamList, 'MPCard'>;

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

export function MPCardScreen({ navigation }: Props) {
  const theme = useTheme();
  const avatarPlaceholder = (
    <Text
      style={{
        width: 44,
        height: 44,
        borderRadius: 9999,
        backgroundColor: theme.colors.surfaceRaised,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 44,
        fontWeight: '600' as const,
      }}
      accessibilityLabel="Avatar placeholder"
    >
      KF
    </Text>
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="MPCard" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
          paddingBottom: theme.spacing[12],
          gap: theme.spacing[4],
        }}
      >
        <View>
          <Text variant="heading" style={{ fontSize: theme.fontSizes.lg }}>
            MPCard (match profile)
          </Text>
          <Text variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
            Match rate progress, and action icons.
          </Text>
        </View>

        <MPCard
          avatar={avatarPlaceholder}
          name="Whereas disregard and contempt"
          subtitle="Fullstack Engineer"
          matchRatePct={94}
          backgroundGradientColors={['#ffffff', '#f8f3e4']}
          textColor="#111827"
          mutedTextColor="#6b7280"
          progressColor="#65a30d"
          progressTrackColor="rgba(17,24,39,0.10)"
          topRightIcon={
            <View
              style={{
                width: 18,
                height: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons name="open-in-new" size={18} color="#111827" />
            </View>
          }
          onPressTopRight={() => {}}
          chatIcon={
            <MaterialCommunityIcons name="message-outline" size={18} color="#111827" />
          }
          onPressChat={() => {}}
          callIcon={<MaterialCommunityIcons name="phone-outline" size={18} color="#111827" />}
          onPressCall={() => {}}
        />
      </ScrollView>
    </View>
  );
}

