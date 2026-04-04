import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Checkbox } from './Checkbox';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Checkbox', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <Checkbox label="Ok" testID="cb" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('cb')).toBeTruthy();
  });

  it('renders unstyled', () => {
    const { getByTestId } = render(
      <Checkbox label="Ok" unstyled testID="cb" />,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('cb')).toBeTruthy();
  });

  it('toggles', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox label="Ok" testID="cb" onChange={onChange} />,
      { wrapper: ThemeWrapper }
    );
    fireEvent.press(getByTestId('cb'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
