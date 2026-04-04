import React from 'react';
import { StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Badge } from './Badge';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Badge', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Badge label="Hi" testID="badge-root" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('badge-root')).toBeTruthy();
  });

  it('renders unstyled', () => {
    const { getByTestId } = render(
      <Badge label="Hi" unstyled testID="badge-root" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('badge-root')).toBeTruthy();
  });

  it('accepts slots override', () => {
    const { getByTestId } = render(
      <Badge
        label="Hi"
        testID="badge-root"
        slots={{ root: { opacity: 0.5 } }}
      />,
      { wrapper: ThemeWrapper }
    );
    const style = getByTestId('badge-root').props.style;
    expect(StyleSheet.flatten(style).opacity).toBe(0.5);
  });

  it('renders dot mode', () => {
    const { getByTestId } = render(
      <Badge dot intent="success" testID="badge-root" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('badge-root')).toBeTruthy();
  });
});
