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
      <SectionTitle subtitle="Pill button (v1). Gradient background is customizable." title="Examples" />

      <View style={{paddingHorizontal: theme.spacing[4]}}>
        <VStack gap={theme.spacing[3]}>
          <Button onPress={() => {}}>Pay Now</Button>

          <Button variant="secondary" onPress={() => {}}>
            Secondary
          </Button>

          <PillButtonV1
            onPress={() => {}}
            backgroundGradientColors={['#111827', '#000000']}
          >
            Pay Now
          </PillButtonV1>

          <Button variant="outline" onPress={() => {}}>
            Outline
          </Button>

          <Button variant="ghost" onPress={() => {}}>
            Ghost
          </Button>

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
          <Button
            variant="outline"
            size="sm"
            onPress={() => {}}
            slots={{ root: { minHeight: 36, paddingHorizontal: theme.spacing[4] } }}
          >
            Small (outline)
          </Button>
        </VStack>
      </View>
    </ScrollView>
  );
}

