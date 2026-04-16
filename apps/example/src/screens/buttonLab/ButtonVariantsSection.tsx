import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, PillButtonV1, Text, useTheme, VStack} from '@my-ui-lib/core';

function SectionDivider() {
  const theme = useTheme();
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth * 2,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing[5],
        opacity: 0.6,
      }}
    />
  );
}

function SectionTitle({title, subtitle}: {title: string; subtitle?: string}) {
  const theme = useTheme();
  const titleStyle = useMemo(
    () => ({
      fontSize: theme.fontSizes.lg,
      fontWeight: theme.fontWeights.semibold as '600',
      color: theme.colors.textPrimary,
    }),
    [theme],
  );
  const subStyle = useMemo(
    () => ({
      marginTop: 2,
      fontSize: theme.fontSizes.sm,
      color: theme.colors.textSecondary,
    }),
    [theme],
  );
  return (
    <View style={{padding: theme.spacing[4], paddingBottom: theme.spacing[2]}}>
      <Text style={titleStyle}>{title}</Text>
      {subtitle ? <Text style={subStyle}>{subtitle}</Text> : null}
    </View>
  );
}

export function ButtonVariantsSection() {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
        paddingBottom: theme.spacing[12],
      }}>
      <SectionTitle
        title="Button"
        subtitle="Pill button (v1). Gradient background is customizable."
      />

      <View style={{paddingHorizontal: theme.spacing[4]}}>
        <VStack gap={theme.spacing[3]}>
          <Button onPress={() => {}}>Pay Now</Button>

          <PillButtonV1
            onPress={() => {}}
            backgroundGradientColors={['#111827', '#000000']}
          >
            Pay Now
          </PillButtonV1>

          <PillButtonV1
            onPress={() => {}}
            backgroundGradientColors={['#7c3aed', '#2563eb']}
          >
            Pay Now
          </PillButtonV1>

          <PillButtonV1 disabled onPress={() => {}}>
            Pay Now
          </PillButtonV1>

          <PillButtonV1 loading onPress={() => {}}>
            Pay Now
          </PillButtonV1>
        </VStack>
      </View>

      <SectionDivider />

      <SectionTitle
        title="Custom styling"
        subtitle="You can override root/text via slots to build more variants."
      />
      <View style={{paddingHorizontal: theme.spacing[4]}}>
        <VStack gap={theme.spacing[3]}>
          <PillButtonV1
            onPress={() => {}}
            backgroundGradientColors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
            textColor={theme.colors.textPrimary}
            slots={{
              root: {
                borderWidth: 1,
                borderColor: theme.colors.border,
                shadowOpacity: 0,
                elevation: 0,
              },
            }}>
            Outline
          </PillButtonV1>
        </VStack>
      </View>
    </ScrollView>
  );
}

