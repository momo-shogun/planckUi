import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../../system/ThemeProvider';
import { PlanckH1V1 } from './PlanckH1V1';

const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

describe('PlanckH1V1', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <PlanckH1V1
        testID="PlanckH1V1"
        title="Planck"
        onSearch={() => {}}
        onNotification={() => {}}
        slots={{ searchIcon: null, notificationIcon: null }}
      />,
      { wrapper }
    );
    expect(getByTestId('PlanckH1V1')).toBeTruthy();
  });
});

