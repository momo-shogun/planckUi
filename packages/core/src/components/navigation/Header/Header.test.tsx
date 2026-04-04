import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../system/ThemeProvider';
import { Header } from './Header';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Header', () => {
  it('renders title', () => {
    const { getByText } = render(<Header title="Screen" testID="hdr" />, {
      wrapper,
    });
    expect(getByText('Screen')).toBeTruthy();
  });

  it('renders unstyled', () => {
    const { getByTestId } = render(
      <Header title="T" unstyled testID="hdr" />,
      { wrapper }
    );
    expect(getByTestId('hdr')).toBeTruthy();
  });
});
