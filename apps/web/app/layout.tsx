import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'planckUi',
  description: 'Headless, copy‑paste React Native UI library for RN CLI.',
  openGraph: {
    title: 'planckUi',
    description: 'Headless, copy‑paste React Native UI library for RN CLI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'planckUi',
    description: 'Headless, copy‑paste React Native UI library for RN CLI.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

