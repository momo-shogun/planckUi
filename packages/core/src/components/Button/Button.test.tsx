import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Button } from './Button';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Button', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Button testID="Button-root" onPress={() => {}}>
        Pay Now
      </Button>,
      { wrapper }
    );
    expect(getByTestId('Button-root')).toBeTruthy();
  });

  it('renders unstyled when unstyled=true', () => {
    const { getByTestId } = render(
      <Button testID="Button-root" unstyled onPress={() => {}}>
        Child
      </Button>,
      { wrapper }
    );
    expect(getByTestId('Button-root')).toBeTruthy();
  });
});
