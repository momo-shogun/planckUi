import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ZeptoTabC } from './ZeptoTabC';

const tabs = [
  { id: 'a', label: 'All', icon: <View testID="icon-a" /> },
  { id: 'b', label: 'Other', icon: <View testID="icon-b" /> },
];

describe('ZeptoTabC', () => {
  it('renders tabs', () => {
    const { getByTestId, getByText } = render(<ZeptoTabC tabs={tabs} testID="ZeptoTabC" />);
    expect(getByTestId('ZeptoTabC')).toBeTruthy();
    expect(getByText('All')).toBeTruthy();
    expect(getByText('Other')).toBeTruthy();
  });

  it('renders NEW badge', () => {
    const { getByText } = render(
      <ZeptoTabC
        tabs={[
          {
            id: 'e',
            label: 'Electronics',
            icon: <Text>icon</Text>,
            badge: { text: 'NEW', variant: 'new' },
          },
        ]}
      />
    );
    expect(getByText('NEW')).toBeTruthy();
  });
});
