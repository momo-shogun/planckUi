import { StyleSheet } from 'react-native';
import { getModalTokens } from '@my-ui-lib/tokens';
import type { SemanticTokens } from '@my-ui-lib/tokens';
import type { ModalSize } from './Modal.types';

type ModalTokenReturn = ReturnType<typeof getModalTokens>;

const MAX_WIDTH: Record<Exclude<ModalSize, 'full'>, number> = {
  sm: 360,
  md: 440,
  lg: 560,
};

export function createModalStyles(
  tokens: ModalTokenReturn,
  theme: SemanticTokens,
  size: ModalSize
) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  const surfaceBase = {
    backgroundColor: tokens.surface,
    borderWidth: 1,
    borderColor: tokens.border,
    borderRadius: radii.lg,
    padding: spacing[4],
  } as const;

  const surfaceSize =
    size === 'full'
      ? {
          width: '100%' as const,
          maxHeight: '90%' as const,
          flex: 1,
          margin: spacing[2],
        }
      : {
          width: '100%' as const,
          maxWidth: MAX_WIDTH[size],
        };

  return StyleSheet.create({
    portalRoot: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing[4],
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: tokens.overlay,
    },
    surface: {
      ...surfaceBase,
      ...surfaceSize,
    },
    content: {
      gap: spacing[3],
    },
    headerRoot: {
      marginBottom: spacing[3],
    },
    headerTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semibold as '600',
      color: tokens.titleColor,
    },
    bodyRoot: {
      gap: spacing[3],
    },
    footerRoot: {
      marginTop: spacing[4],
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: spacing[2],
    },
  });
}
