import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Switch } from './Switch';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Switch', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <Switch label="Airplane" testID="sw" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('sw')).toBeTruthy();
  });

  it('renders unstyled', () => {
    const { getByTestId } = render(
      <Switch label="A" unstyled testID="sw" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('sw')).toBeTruthy();
  });

  it('toggles', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Switch testID="sw" onChange={onChange} />,
      { wrapper: ThemeWrapper }
    );
    fireEvent.press(getByTestId('sw'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
