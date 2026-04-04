import React from 'react';
import { Animated } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Toast } from './Toast';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Toast', () => {
  it('renders title and description', () => {
    const progress = new Animated.Value(1);
    const { getByText } = render(
      <Toast
        title="Saved"
        description="Your changes are stored."
        intent="success"
        progress={progress}
        testID="toast-one"
      />,
      { wrapper }
    );
    expect(getByText('Saved')).toBeTruthy();
    expect(getByText('Your changes are stored.')).toBeTruthy();
  });

  it('renders unstyled', () => {
    const progress = new Animated.Value(1);
    const { getByTestId } = render(
      <Toast title="Hi" progress={progress} unstyled testID="toast-u" />,
      { wrapper }
    );
    expect(getByTestId('toast-u')).toBeTruthy();
  });
});

describe('ToastProvider', () => {
  it('shows a toast from showToast', async () => {
    function Probe() {
      const { showToast } = useToast();
      React.useEffect(() => {
        showToast({ title: 'Queued', id: 't1' });
      }, [showToast]);
      return null;
    }
    const { getByText } = render(
      <ToastProvider>
        <Probe />
      </ToastProvider>,
      { wrapper }
    );
    await waitFor(() => {
      expect(getByText('Queued')).toBeTruthy();
    });
  });

  it('throws when useToast is used outside provider', () => {
    function Bad() {
      useToast();
      return null;
    }
    expect(() => render(<Bad />)).toThrow(/ToastProvider/);
  });
});
