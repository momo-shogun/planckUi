import { StyleSheet } from 'react-native';
import { getTabBarTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';
import type { TabBarVariant } from '@my-ui-lib/tokens';

type Tokens = ReturnType<typeof getTabBarTokens>;

export function createTabBarStyles(
  tokens: Tokens,
  theme: SemanticTokens,
  variant: TabBarVariant
) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  const floating =
    variant === 'floating'
      ? {
          marginHorizontal: spacing[4],
          marginBottom: spacing[3],
          borderRadius: radii.lg,
          shadowColor: tokens.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 8,
          elevation: 6,
        }
      : {};

  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: tokens.bg,
      borderTopWidth: variant === 'minimal' ? 0 : StyleSheet.hairlineWidth,
      borderColor: tokens.border,
      paddingVertical: spacing[2],
      ...floating,
    },
    item: {
      flex: 1,
      alignItems: 'center',
      gap: spacing[1],
      paddingVertical: spacing[1],
    },
    itemActive: {},
    iconWrap: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.medium as '500',
      color: tokens.itemLabel,
    },
    labelActive: {
      color: tokens.itemLabelActive,
      fontWeight: fontWeights.semibold as '600',
    },
    indicator: {
      marginTop: 2,
      height: 3,
      width: 24,
      borderRadius: radii.full,
      backgroundColor: tokens.indicator,
    },
  });
}
