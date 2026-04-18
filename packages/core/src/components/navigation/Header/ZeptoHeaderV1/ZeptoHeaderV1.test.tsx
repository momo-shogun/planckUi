import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../../system/ThemeProvider';
import { ZeptoHeaderV1 } from './ZeptoHeaderV1';

const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

describe('ZeptoHeaderV1', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <ZeptoHeaderV1
        testID="ZeptoHeaderV1"
        backgroundColor="#D2A679"
        etaLabel="6 minutes"
        addressLabel="Home - 1/36, 1/32, Krishna Vihar Colon..."
        walletLabel="₹0"
      />,
      { wrapper }
    );
    expect(getByTestId('ZeptoHeaderV1')).toBeTruthy();
  });
});
