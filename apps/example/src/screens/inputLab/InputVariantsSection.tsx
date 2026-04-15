import React, {useMemo, useState} from 'react';
import {ComposerInput, Input, Text, useTheme, VStack} from '@my-ui-lib/core';
import {ScrollView, StyleSheet, View} from 'react-native';

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

export function InputVariantsSection() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [composer, setComposer] = useState('');

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
        paddingBottom: theme.spacing[12],
      }}>
      <SectionTitle title="Input" subtitle="Text field with label, error, and focus ring." />
      <View style={{paddingHorizontal: theme.spacing[4]}}>
        <VStack gap={theme.spacing[3]}>
          <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
          <Input
            label="Error"
            placeholder="you@example.com"
            error="Please enter a valid email address"
            value="not-an-email"
          />
          <Input label="Disabled" placeholder="Disabled field" disabled value="Disabled" />
        </VStack>
      </View>

      <SectionDivider />

      <SectionTitle
        title="ComposerInput"
        subtitle="Prompt bar: + button, chips, mic action, and send."
      />
      <View style={{paddingHorizontal: theme.spacing[4]}}>
        <VStack gap={theme.spacing[3]}>
          <ComposerInput
            value={composer}
            onChangeText={setComposer}
            chips={[
              {id: 'gmail', label: 'Gmail', count: 2},
              // {id: 'drive', label: 'Drive'},
            ]}
            onPressAdd={() => {}}
            onPressChip={() => {}}
            onPressMic={() => {}}
            onPressSend={() => {}}
          />
          <ComposerInput
            defaultValue="Draft message…"
            hideMic
            chips={[{id: 'all', label: 'All'}]}
            onPressAdd={() => {}}
            onPressSend={() => {}}
          />
        </VStack>
      </View>
    </ScrollView>
  );
}

