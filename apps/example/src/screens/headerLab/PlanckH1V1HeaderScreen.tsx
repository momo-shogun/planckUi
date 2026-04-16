import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StatusBar, View } from 'react-native';
import { PlanckH1V1, Text, useTheme } from '@my-ui-lib/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';
import type { HeaderLabStackParamList } from '../../navigation/headerLab/types';

type Props = NativeStackScreenProps<HeaderLabStackParamList, 'PlanckH1V1'>;

const HEADER_GRADIENT_COLORS = ['#5b21b6', '#1e40af'] as const;

export function PlanckH1V1HeaderScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ position: 'relative' }}>
        {/* Make status bar area match the header gradient */}
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%">
            <Defs>
              <SvgLinearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={HEADER_GRADIENT_COLORS[0]} stopOpacity="1" />
                <Stop offset="100%" stopColor={HEADER_GRADIENT_COLORS[1]} stopOpacity="1" />
              </SvgLinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#headerGradient)" />
          </Svg>
        </View>
        <View style={{ paddingTop: insets.top }}>
          <PlanckH1V1
            title="Qwash"
            backgroundGradientColors={HEADER_GRADIENT_COLORS}
            logoIcon={
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  borderWidth: 2,
                  borderColor: '#ffffff',
                  opacity: 0.9,
                }}
              />
            }
            notificationDot
            onSearch={() => navigation.goBack()}
            onNotification={() => navigation.goBack()}
            slots={{
              searchIcon: <MaterialCommunityIcons name="refresh" size={18} color="#ffffff" />,
              notificationIcon: (
                <MaterialCommunityIcons name="bell-outline" size={18} color="#ffffff" />
              ),
            }}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing[4],
          gap: theme.spacing[3],
        }}
      >
        <Text variant="heading">PlanckH1V1</Text>
        <Text variant="body" color={theme.colors.textSecondary}>
          Logo + brand title on the left, and circular search/notification actions on the right.
        </Text>
      </ScrollView>
    </View>
  );
}

