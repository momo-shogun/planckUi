import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Modal } from './Modal';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Modal', () => {
  it('renders without crashing when open', () => {
    const { getByTestId } = render(
      <Modal open testID="Modal-root">
        <React.Fragment />
      </Modal>,
      { wrapper }
    );
    expect(getByTestId('Modal-root')).toBeTruthy();
  });

  it('renders unstyled when unstyled=true', () => {
    const { getByTestId } = render(
      <Modal open unstyled testID="Modal-root">
        <React.Fragment />
      </Modal>,
      { wrapper }
    );
    expect(getByTestId('Modal-root')).toBeTruthy();
  });
});
