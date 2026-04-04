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
      paddingVertical: spacing[2] + 1,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: tokens.triggerBorder,
      backgroundColor: tokens.triggerBg,
      minHeight: spacing[6] + spacing[4],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
      elevation: 2,
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
      opacity: 0.75,
    },
    triggerCaretOpen: {
      transform: [{ rotate: '180deg' }],
    },
    overlay: {
      backgroundColor: tokens.overlay,
    },
    anchoredBackdrop: {
      backgroundColor: tokens.anchoredBackdrop,
    },
    modalWrap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[6],
    },
    modalCard: {
      borderRadius: radii.lg,
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
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: tokens.menuBorder,
      backgroundColor: tokens.menuBg,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.14,
      shadowRadius: 12,
      elevation: 10,
    },
    searchInput: {
      margin: 0,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      fontSize: theme.fontSizes.md,
      color: tokens.searchText,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tokens.searchSeparator,
      backgroundColor: tokens.menuBg,
    },
    listScroll: {
      flexGrow: 0,
    },
    menuItem: {
      paddingHorizontal: spacing[3],
      paddingVertical: 0,
      minHeight: spacing[6] + spacing[2],
      justifyContent: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tokens.menuBorder,
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuItemPressed: {
      backgroundColor: tokens.itemPressedBg,
    },
    menuItemSelected: {
      backgroundColor: tokens.itemSelectedBg,
    },
    menuItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      paddingVertical: spacing[3],
      paddingRight: spacing[1],
    },
    itemLeading: {
      width: 28,
      fontSize: theme.fontSizes.md,
      fontWeight: theme.fontWeights.semibold as '600',
      textAlign: 'center',
      color: tokens.checkmark,
    },
    itemLeadingEmpty: {
      opacity: 0,
    },
    menuItemText: {
      flex: 1,
      fontSize: theme.fontSizes.md,
      fontWeight: theme.fontWeights.regular as '400',
      color: tokens.itemText,
    },
    menuItemTextDisabled: {
      color: tokens.itemDisabledText,
    },
    /** Multi-select default row */
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: radii.sm,
      borderWidth: 1.5,
      borderColor: tokens.menuBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.menuBg,
    },
    checkboxOn: {
      borderColor: tokens.checkmark,
      backgroundColor: tokens.itemSelectedBg,
    },
    checkboxMark: {
      fontSize: theme.fontSizes.sm,
      fontWeight: theme.fontWeights.bold as '700',
      color: tokens.checkmark,
      lineHeight: theme.fontSizes.sm * 1.2,
    },
  });
}
