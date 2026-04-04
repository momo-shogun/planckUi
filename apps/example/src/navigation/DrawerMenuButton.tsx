import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  hit: {
    marginLeft: 0,
    paddingVertical: 10,
    paddingRight: 4,
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 14,
    justifyContent: 'space-between',
  },
  bar: {
    height: 2,
    borderRadius: 1,
    width: 22,
  },
});

/**
 * Opens the drawer via DrawerActions (same as @react-navigation/drawer DrawerToggleButton)
 * but draws the icon with Views so Metro always shows it in monorepos.
 */
export function DrawerMenuButton({barColor}: {barColor: string}) {
  const navigation = useNavigation();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open navigation menu"
      hitSlop={{top: 12, bottom: 12, left: 8, right: 8}}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.hit}>
      <View style={styles.icon}>
        <View style={[styles.bar, {backgroundColor: barColor}]} />
        <View style={[styles.bar, {backgroundColor: barColor}]} />
        <View style={[styles.bar, {backgroundColor: barColor}]} />
      </View>
    </Pressable>
  );
}
