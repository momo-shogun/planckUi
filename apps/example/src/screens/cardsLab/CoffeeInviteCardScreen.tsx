import React from 'react';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CoffeeInviteCard,
  Pressable,
  Text,
  useTheme,
} from '@my-ui-lib/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { CardsLabStackParamList } from '../../navigation/cardsLab/types';

type Props = NativeStackScreenProps<CardsLabStackParamList, 'CoffeeInviteCard'>;

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

export function CoffeeInviteCardScreen({ navigation }: Props) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="CoffeeInviteCard" onBack={() => navigation.goBack()} />
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
            CoffeeInviteCard
          </Text>
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            style={{ marginTop: 2 }}
          >
            Profile, mutuals, and a primary CTA.
          </Text>
        </View>

        <CoffeeInviteCard
          name="Keri Saratoga"
          role="Product Designer"
          handle="@Asana"
          mutualCount={4}
          onPressPrimary={() => {}}
          onPressSecondary={() => {}}
        />
      </ScrollView>
    </View>
  );
}

