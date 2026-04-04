import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../system/ThemeProvider';
import { BackButton } from './BackButton';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('BackButton', () => {
  it('fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(<BackButton onPress={onPress} />, {
      wrapper,
    });
    fireEvent.press(getByLabelText('Go back'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders unstyled', () => {
    const { getByLabelText } = render(
      <BackButton onPress={jest.fn()} unstyled testID="back" />,
      { wrapper }
    );
    expect(getByLabelText('Go back')).toBeTruthy();
  });
});
