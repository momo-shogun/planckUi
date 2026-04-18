import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import { Text, useTheme, ZeptoHeaderV1 } from '@my-ui-lib/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { HeaderLabStackParamList } from '../../navigation/headerLab/types';

type Props = NativeStackScreenProps<HeaderLabStackParamList, 'ZeptoHeaderV1'>;

const ZEPTO_HEADER_BG = '#D2A679';

export function ZeptoHeaderV1Screen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ paddingTop: insets.top, backgroundColor: ZEPTO_HEADER_BG }}>
        <ZeptoHeaderV1
          backgroundColor={ZEPTO_HEADER_BG}
          etaLabel="6 minutes"
          addressLabel="Home - 1/36, 1/32, Krishna Vihar Colon..."
          walletLabel="₹0"
          onAddressPress={() => navigation.goBack()}
          onWalletPress={() => navigation.goBack()}
          onProfilePress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing[4],
          gap: theme.spacing[3],
        }}
      >
        <Text variant="heading">ZeptoHeaderV1</Text>
        <Text variant="body" color={theme.colors.textSecondary}>
          Zepto-style delivery header: ETA + address on the left, wallet pill (Button) and profile
          (ButtonIconOnly) on the right. Pass any solid color as backgroundColor on ZeptoHeaderV1.
        </Text>
      </ScrollView>
    </View>
  );
}
