import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from '@my-ui-lib/core';
import { PlankBarV1Section } from './tabsLab/PlankBarV1Section';
import { PlankBarV2Section } from './tabsLab/PlankBarV2Section';
import { TabBarVariantsSection } from './tabsLab/TabBarVariantsSection';
import { TabsControlledSection } from './tabsLab/TabsControlledSection';
import { TabsScrollableSection } from './tabsLab/TabsScrollableSection';
import { TabsSizesSection } from './tabsLab/TabsSizesSection';
import { TabsVariantsSection } from './tabsLab/TabsVariantsSection';
import { ZeptoTabsSection } from './tabsLab/ZeptoTabsSection';

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
    <>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          paddingBottom: theme.spacing[12],
        }}>
        <ZeptoTabsSection />

        <SectionDivider />
        <View style={{ padding: theme.spacing[4] }}>
          <TabsVariantsSection />
        </View>
      </ScrollView>
    </>
  );
}
