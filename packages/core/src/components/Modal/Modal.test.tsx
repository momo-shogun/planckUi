import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Text } from '../../primitives/Text';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Modal, ModalBody, ModalHeader } from './Modal';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Modal', () => {
  it('renders without crashing when visible', () => {
    const { getByTestId } = render(
      <Modal visible testID="Modal-root">
        <React.Fragment />
      </Modal>,
      { wrapper }
    );
    expect(getByTestId('Modal-root')).toBeTruthy();
  });

  it('renders unstyled when unstyled=true', () => {
    const { getByTestId } = render(
      <Modal visible unstyled testID="Modal-root">
        <React.Fragment />
      </Modal>,
      { wrapper }
    );
    expect(getByTestId('Modal-root')).toBeTruthy();
  });

  it('calls onClose when backdrop is pressed', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <Modal visible onClose={onClose} testID="Modal-root">
        <ModalHeader>Title</ModalHeader>
      </Modal>,
      { wrapper }
    );
    fireEvent.press(getByLabelText('Dismiss modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders header and body children', () => {
    const { getByText } = render(
      <Modal visible testID="Modal-root">
        <ModalHeader>Hello</ModalHeader>
        <ModalBody>
          <Text>World</Text>
        </ModalBody>
      </Modal>,
      { wrapper }
    );
    expect(getByText('Hello')).toBeTruthy();
    expect(getByText('World')).toBeTruthy();
  });
});
