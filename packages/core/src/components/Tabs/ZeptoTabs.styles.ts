import { Platform, StyleSheet } from 'react-native';

export const ZEPTO = {
  pillRadius: 17,
  pillHeight: 38,
  tabPadH: 13,
  tabPadV: 8,
  gap: 9,
  scrollPadH: 12,
  scrollPadV: 6,
  fontSize: 13,
  activeScale: 1.04,
} as const;

export const zeptoTabsStyles = StyleSheet.create({
  outer: {
    alignSelf: 'stretch',
    borderRadius: ZEPTO.pillRadius + 6,
    overflow: 'hidden',
  },
  scroll: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: ZEPTO.scrollPadH,
    paddingVertical: ZEPTO.scrollPadV,
    gap: ZEPTO.gap,
  },
  highlight: {
    position: 'absolute',
    left: 0,
    top: ZEPTO.scrollPadV,
    height: ZEPTO.pillHeight,
    borderRadius: ZEPTO.pillRadius,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      default: {
        elevation: 4,
        shadowColor: '#000',
      },
    }),
  },
  pressable: {
    zIndex: 1,
    borderRadius: ZEPTO.pillRadius,
    overflow: 'hidden',
  },
  tabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: ZEPTO.pillHeight,
    paddingHorizontal: ZEPTO.tabPadH,
    paddingVertical: ZEPTO.tabPadV,
    borderRadius: ZEPTO.pillRadius,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  tabInnerActive: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: ZEPTO.fontSize,
    fontWeight: '600',
  },
  labelActive: {
    color: '#141414',
  },
  labelInactive: {
    color: '#6B6B70',
    fontWeight: '500',
  },
  iconWrap: {
    marginRight: 6,
  },
});
