import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, useTheme} from '@my-ui-lib/core';
import {PlankBarV1Section} from './tabsLab/PlankBarV1Section';
import {TabBarVariantsSection} from './tabsLab/TabBarVariantsSection';
import {TabsControlledSection} from './tabsLab/TabsControlledSection';
import {TabsScrollableSection} from './tabsLab/TabsScrollableSection';
import {TabsSizesSection} from './tabsLab/TabsSizesSection';
import {TabsVariantsSection} from './tabsLab/TabsVariantsSection';

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

export function TabsLabScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
        paddingBottom: theme.spacing[12],
      }}>
      <Text variant="heading" style={{marginBottom: theme.spacing[3]}}>
        Planck Tabs and TabBar
      </Text>
      <TabsVariantsSection />
      <SectionDivider />
      <TabsSizesSection />
      <SectionDivider />
      <TabsScrollableSection />
      <SectionDivider />
      <TabsControlledSection />
      <SectionDivider />
      <TabBarVariantsSection />
      <SectionDivider />
      <PlankBarV1Section />
    </ScrollView>
  );
}
