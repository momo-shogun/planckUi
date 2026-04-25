import React, { useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StatusBar, View } from 'react-native';
import { Text, useTheme, ZeptoHS } from '@my-ui-lib/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { HomeScreenLabStackParamList } from '../../navigation/homeLab/types';
import { getZeptoTabCShowcaseItems } from '../../showcase/zeptoTabCShowcaseItems';

type Props = NativeStackScreenProps<HomeScreenLabStackParamList, 'ZeptoHS'>;

const ZEPTO_HEADER_BG = '#D2A679';

export function ZeptoHSScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [tabIx, setTabIx] = useState(0);
  const tabs = useMemo(() => getZeptoTabCShowcaseItems(), []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        translucent
        backgroundColor={ZEPTO_HEADER_BG}
        barStyle="dark-content"
      />
      <View style={{ flex: 1, backgroundColor: ZEPTO_HEADER_BG, paddingTop: insets.top }}>
        <ZeptoHS
          testID="ZeptoHSShowcase"
          header={{
            backgroundColor: ZEPTO_HEADER_BG,
            etaLabel: '6 minutes',
            addressLabel: 'Home - 1/36, 1/32, Krishna Vihar Colon...',
            walletLabel: '₹0',
            onMenuPress: () => navigation.goBack(),
            onAddressPress: () => navigation.goBack(),
            onWalletPress: () => navigation.goBack(),
            onProfilePress: () => navigation.goBack(),
          }}
          tabStrip={{
            tabs,
            activeIndex: tabIx,
            onChange: (index) => setTabIx(index),
          }}
        >
          <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView
              contentContainerStyle={{
                padding: theme.spacing[4],
                paddingBottom: theme.spacing[12],
                gap: theme.spacing[2],
              }}
            >
              <Text variant="heading">ZeptoHS</Text>
              <Text variant="body" color={theme.colors.textSecondary}>
                Preset home shell: ZeptoHeaderV1 + ZeptoTabC. Active category:{' '}
                {tabs[tabIx]?.label ?? '—'}.
              </Text>
            </ScrollView>
          </View>
        </ZeptoHS>
      </View>
    </View>
  );
}
