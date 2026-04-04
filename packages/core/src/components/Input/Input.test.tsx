import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Input } from './Input';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Input', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Input testID="Input-field" label="Name" />,
      { wrapper }
    );
    expect(getByTestId('Input-field')).toBeTruthy();
  });

  it('renders unstyled when unstyled=true', () => {
    const { getByTestId } = render(<Input testID="Input-field" unstyled />, { wrapper });
    expect(getByTestId('Input-field')).toBeTruthy();
  });
});
