import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Avatar } from './Avatar';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Avatar', () => {
  it('renders with initials', () => {
    const { getByTestId } = render(
      <Avatar fallback="JD" testID="av" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('av')).toBeTruthy();
  });

  it('renders unstyled', () => {
    const { getByTestId } = render(
      <Avatar fallback="A" unstyled testID="av" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('av')).toBeTruthy();
  });

  it('accepts slots', () => {
    const { getByTestId } = render(
      <Avatar fallback="XY" testID="av" slots={{ root: { opacity: 0.9 } }} />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('av')).toBeTruthy();
  });
});
