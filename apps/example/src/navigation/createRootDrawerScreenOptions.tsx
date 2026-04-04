import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import type {SemanticTokens} from '@my-ui-lib/tokens';
import {DrawerMenuButton} from './DrawerMenuButton';

type EdgeInsets = {top: number; left: number; right: number};

/**
 * Header + drawer chrome for the example app. Keeps screen option shape in one place.
 */
export function createRootDrawerScreenOptions(args: {
  theme: SemanticTokens;
  insets: EdgeInsets;
  drawerWidth: number;
}) {
  const {theme, insets, drawerWidth} = args;
  const edgePad = Math.max(theme.spacing[3], 12);
  const padLeft = Math.max(insets.left, edgePad);
  const padRight = Math.max(insets.right, edgePad);

  return {
    headerStyle: {
      backgroundColor: theme.colors.surface,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: theme.colors.textPrimary,
    headerTitleStyle: {
      fontSize: theme.fontSizes.lg,
      fontWeight: theme.fontWeights.semibold as '600',
      color: theme.colors.textPrimary,
      letterSpacing: Platform.OS === 'ios' ? -0.25 : 0,
    },
    headerTitleAlign: Platform.select<'center' | 'left'>({
      ios: 'center',
      default: 'left',
    }),
    headerTitleContainerStyle: {
      paddingHorizontal: theme.spacing[2],
    },
    headerLeftContainerStyle: {
      paddingLeft: padLeft,
    },
    headerRightContainerStyle: {
      paddingRight: padRight,
    },
    headerLeft: () => (
      <DrawerMenuButton barColor={theme.colors.textPrimary} />
    ),
    drawerStyle: {
      backgroundColor: theme.colors.surface,
      width: drawerWidth,
    },
  };
}
