import { StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

type CheckboxTokens = ReturnType<
  typeof import('@my-ui-lib/tokens').getCheckboxTokens
>;

const BOX: Record<string, number> = { sm: 16, md: 20, lg: 24 };

export function createCheckboxStyles(
  tokens: CheckboxTokens,
  theme: SemanticTokens,
  size: keyof typeof BOX
) {
  const box = BOX[size];
  const labelFs = {
    sm: theme.fontSizes.xs,
    md: theme.fontSizes.sm,
    lg: theme.fontSizes.md,
  }[size];
  const descFs = {
    sm: theme.fontSizes.xs,
    md: theme.fontSizes.xs,
    lg: theme.fontSizes.sm,
  }[size];

  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing[2],
    },
    pressable: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing[2],
    },
    boxOuter: {
      width: box,
      height: box,
      borderRadius: theme.radii.sm,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    fillLayer: {
      ...StyleSheet.absoluteFillObject,
    },
    checkArea: {
      width: box * 0.55,
      height: box * 0.55,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkLeg1: {
      position: 'absolute',
      width: box * 0.1,
      height: box * 0.35,
      borderRadius: 1,
      transform: [{ rotate: '-45deg' }, { translateX: -box * 0.08 }],
      bottom: box * 0.12,
      left: box * 0.22,
    },
    checkLeg2: {
      position: 'absolute',
      width: box * 0.1,
      height: box * 0.5,
      borderRadius: 1,
      transform: [{ rotate: '45deg' }, { translateX: box * 0.12 }],
      bottom: box * 0.1,
      left: box * 0.38,
    },
    indeterminateBar: {
      width: box * 0.55,
      height: box * 0.12,
      borderRadius: 1,
    },
    textCol: {
      flex: 1,
      flexShrink: 1,
    },
    label: {
      fontSize: labelFs,
      fontWeight: theme.fontWeights.medium as '500',
      color: tokens.labelColor,
    },
    description: {
      fontSize: descFs,
      marginTop: theme.spacing[1],
      color: tokens.descriptionColor,
    },
  });
}
