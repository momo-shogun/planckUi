import { StyleSheet } from 'react-native';
import type { getDropdownMenuTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type DropdownMenuTokens = ReturnType<typeof getDropdownMenuTokens>;

export function getDefaultMenuListMaxHeight(theme: SemanticTokens): number {
  return theme.spacing[8] * 8;
}

export function createDropdownMenuStyles(
  tokens: DropdownMenuTokens,
  theme: SemanticTokens
) {
  const { spacing, radii } = theme;

  return StyleSheet.create({
    root: {
      alignSelf: 'stretch',
    },
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[2],
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: tokens.triggerBorder,
      backgroundColor: tokens.triggerBg,
      minHeight: spacing[6] + spacing[4],
    },
    triggerDisabled: {
      opacity: 0.5,
    },
    triggerText: {
      flex: 1,
      fontSize: theme.fontSizes.md,
      fontWeight: theme.fontWeights.regular as '400',
      color: tokens.triggerText,
    },
    triggerCaret: {
      fontSize: theme.fontSizes.sm,
      color: tokens.triggerText,
      marginLeft: spacing[2],
    },
    overlay: {
      backgroundColor: tokens.overlay,
    },
    modalWrap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[6],
    },
    modalCard: {
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: tokens.menuBorder,
      backgroundColor: tokens.menuBg,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 12,
    },
    menuSurface: {
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: tokens.menuBorder,
      backgroundColor: tokens.menuBg,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 8,
    },
    searchInput: {
      margin: 0,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      fontSize: theme.fontSizes.md,
      color: tokens.searchText,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tokens.searchSeparator,
    },
    listScroll: {
      flexGrow: 0,
    },
    menuItem: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
    },
    menuItemPressed: {
      backgroundColor: tokens.itemPressedBg,
    },
    menuItemSelected: {
      backgroundColor: tokens.itemSelectedBg,
    },
    menuItemText: {
      fontSize: theme.fontSizes.md,
      fontWeight: theme.fontWeights.regular as '400',
      color: tokens.itemText,
    },
    menuItemTextDisabled: {
      color: tokens.itemDisabledText,
    },
  });
}
