import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../system/ThemeProvider';
import { ZeptoHS } from './ZeptoHS';

const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

const header = {
  backgroundColor: '#D2A679',
  etaLabel: '6 min',
  addressLabel: 'Home',
  walletLabel: '₹0',
};

const tabs = [
  { id: 'a', label: 'All', icon: <View testID="ico-a" /> },
  { id: 'b', label: 'More', icon: <View testID="ico-b" /> },
];

describe('ZeptoHS', () => {
  it('renders header and tab strip', () => {
    const { getByTestId, getByText } = render(
      <ZeptoHS
        testID="ZeptoHS"
        header={header}
        tabStrip={{ tabs }}
      />,
      { wrapper }
    );
    expect(getByTestId('ZeptoHS')).toBeTruthy();
    expect(getByText('6 min')).toBeTruthy();
    expect(getByText('All')).toBeTruthy();
  });
});
