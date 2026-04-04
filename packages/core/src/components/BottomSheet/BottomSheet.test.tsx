import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { BottomSheet } from './BottomSheet';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('BottomSheet', () => {
  it('renders children when mounted with visible', () => {
    const { getByTestId, getByText } = render(
      <BottomSheet visible onClose={jest.fn()} testID="sheet">
        <Text>Inside</Text>
      </BottomSheet>,
      { wrapper }
    );
    expect(getByTestId('sheet')).toBeTruthy();
    expect(getByText('Inside')).toBeTruthy();
  });

  it('supports unstyled', () => {
    const { getByTestId } = render(
      <BottomSheet visible unstyled testID="sheet" onClose={jest.fn()}>
        <Text>X</Text>
      </BottomSheet>,
      { wrapper }
    );
    expect(getByTestId('sheet')).toBeTruthy();
  });
});
