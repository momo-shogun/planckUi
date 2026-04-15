import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../system/ThemeProvider';
import { ComposerInput } from './ComposerInput';

const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

describe('ComposerInput', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<ComposerInput testID="ComposerInput" />, { wrapper });
    expect(getByTestId('ComposerInput')).toBeTruthy();
  });

  it('renders chips', () => {
    const { getByText } = render(
      <ComposerInput chips={[{ id: 'gmail', label: 'Gmail', count: 2 }]} />,
      { wrapper }
    );
    expect(getByText('Gmail')).toBeTruthy();
    expect(getByText('+2')).toBeTruthy();
  });
});

