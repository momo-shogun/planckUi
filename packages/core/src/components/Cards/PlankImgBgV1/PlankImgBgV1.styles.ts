import { Platform, StyleSheet } from 'react-native';
import type { SemanticTokens } from '@my-ui-lib/tokens';

export function createPlankImgBgV1Styles(
  theme: SemanticTokens,
  opts?: {
    borderColor?: string;
    backgroundColor?: string;
    overlayColor?: string;
    overlayOpacity?: number;
    titleColor?: string;
    subtitleColor?: string;
    joinedTextColor?: string;
  },
) {
  const { spacing, radii, fontSizes, fontWeights } = theme;

  const borderColor = opts?.borderColor ?? 'rgba(255,255,255,0.14)';
  const backgroundColor = opts?.backgroundColor ?? '#6d28d9';
  const overlayColor = opts?.overlayColor ?? 'rgba(124,58,237,0.78)';
  const overlayOpacity = opts?.overlayOpacity ?? 1;
  const titleColor = opts?.titleColor ?? '#ffffff';
  const subtitleColor = opts?.subtitleColor ?? 'rgba(255,255,255,0.85)';
  const joinedTextColor = opts?.joinedTextColor ?? 'rgba(255,255,255,0.85)';

  const shadow = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.22,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 8,
    },
    default: {},
  });

  return StyleSheet.create({
    root: {
      width: 260,
      borderRadius: radii.xl,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor,
      backgroundColor,
      ...(shadow ?? {}),
    },

    bgImage: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },

    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: overlayColor,
      opacity: overlayOpacity,
    },

    content: {
      padding: spacing[4],
      gap: spacing[3],
      minHeight: 188,
      justifyContent: 'space-between',
    },

    tagsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
    },

    tagPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
      borderRadius: radii.full,
      backgroundColor: 'rgba(255,255,255,0.16)',
    },

    tagText: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semibold as '600',
      color: 'rgba(255,255,255,0.92)',
    },

    title: {
      fontSize: 26,
      lineHeight: 30,
      fontWeight: fontWeights.bold as '700',
      color: titleColor,
      letterSpacing: -0.4,
    },

    subtitle: {
      marginTop: spacing[2],
      fontSize: fontSizes.sm,
      lineHeight: fontSizes.sm + 6,
      color: subtitleColor,
      fontWeight: fontWeights.medium as '500',
    },

    avatarsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    joinedText: {
      marginLeft: spacing[2],
      fontSize: fontSizes.xs,
      color: joinedTextColor,
      fontWeight: fontWeights.medium as '500',
    },

    footerPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[2],
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
      borderRadius: radii.lg,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignSelf: 'flex-start',
    },

    footerText: {
      color: '#ffffff',
      fontWeight: fontWeights.semibold as '600',
      fontSize: fontSizes.sm,
    },
  });
}

