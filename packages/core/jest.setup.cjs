/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { View } = require('react-native');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.callNative = () => {};
  return Reanimated;
});

jest.mock('@gorhom/portal', () => ({
  Portal: ({ children }) => children,
  PortalHost: () => null,
}));

jest.mock('@gorhom/bottom-sheet', () => {
  const BottomSheetModal = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      present: jest.fn(),
      dismiss: jest.fn(),
      snapToIndex: jest.fn(),
    }));
    return React.createElement(
      View,
      { testID: 'bottom-sheet-modal-mock' },
      props.children
    );
  });
  BottomSheetModal.displayName = 'BottomSheetModal';
  return {
    BottomSheetModal,
    BottomSheetModalProvider: ({ children }) => children,
    BottomSheetBackdrop: () => null,
    BottomSheetView: View,
  };
});
