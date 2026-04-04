'use strict';
const React = require('react');
const { View } = require('react-native');

const BottomSheetModal = React.forwardRef((props, ref) =>
  React.createElement(View, { testID: 'bottom-sheet-modal-stub' }, props.children)
);
BottomSheetModal.displayName = 'BottomSheetModal';

module.exports = {
  BottomSheetModal,
  BottomSheetModalProvider: function BottomSheetModalProvider({ children }) {
    return children;
  },
  BottomSheetBackdrop: function BottomSheetBackdrop() {
    return null;
  },
  BottomSheetView: View,
};
