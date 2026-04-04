import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';
import type { TabsVariant } from '@my-ui-lib/tokens';
import type { TabsSize } from './Tabs.types';

type TabsTokens = ReturnType<typeof import('@my-ui-lib/tokens').getTabsTokens>;

export function createTabsStyles(
  tokens: TabsTokens,
  theme: SemanticTokens,
  size: TabsSize,
  variant: TabsVariant
) {
  const padH = {
    sm: theme.spacing[2],
    md: theme.spacing[3],
    lg: theme.spacing[4],
  }[size];
  const padV = {
    sm: theme.spacing[1],
    md: theme.spacing[2],
    lg: theme.spacing[3],
  }[size];
  const fs = {
    sm: theme.fontSizes.xs,
    md: theme.fontSizes.sm,
    lg: theme.fontSizes.md,
  }[size];

  return StyleSheet.create({
    root: {
      alignSelf: 'stretch',
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: tokens.tabBarBg,
      borderWidth: variant === 'bordered' ? 1 : 0,
      borderColor: tokens.borderColor,
      borderRadius: variant === 'bordered' ? theme.radii.md : 0,
      padding: variant === 'bordered' ? theme.spacing[1] : 0,
      position: 'relative',
    },
    tabRow: {
      flexDirection: 'row',
      alignItems: 'stretch',
      position: 'relative',
    },
    tabPress: {
      paddingHorizontal: padH,
      paddingVertical: padV,
    },
    tabInner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[1],
    },
    tabLabel: {
      fontSize: fs,
      fontWeight: theme.fontWeights.medium as '500',
      color: tokens.tabText,
    },
    tabLabelActive: {
      color: tokens.tabTextActive,
    },
    badge: {
      minWidth: theme.spacing[4],
      paddingHorizontal: theme.spacing[1],
      paddingVertical: 2,
      borderRadius: theme.radii.full,
      backgroundColor: tokens.badgeBg,
      alignItems: 'center',
    },
    badgeText: {
      fontSize: theme.fontSizes.xs,
      fontWeight: theme.fontWeights.semibold as '600',
      color: tokens.badgeText,
    },
    indicator: {
      position: 'absolute',
      backgroundColor: tokens.indicatorColor,
      borderRadius: theme.radii.sm,
    },
    indicatorUnderline: {
      height: 2,
      bottom: 0,
    },
    content: {
      marginTop: theme.spacing[3],
    },
  });
}
