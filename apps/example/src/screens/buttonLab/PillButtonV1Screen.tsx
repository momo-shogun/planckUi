import React from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, useTheme } from '@my-ui-lib/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ButtonLabStackParamList } from '../../navigation/buttonLab/types';
import { ButtonVariantsSection } from './ButtonVariantsSection';

type Props = NativeStackScreenProps<ButtonLabStackParamList, 'PillButtonV1'>;

export function PillButtonV1Screen({ navigation }: Props) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
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
          onPress={() => navigation.goBack()}
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
          PillButtonV1
        </Text>

        <View style={{ width: 40, height: 40 }} />
      </View>

      <ButtonVariantsSection />
    </View>
  );
}

