import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Snippet Vault',
  description: 'Mini fullstack app for saving code snippets, notes and links.',
  icons: {
    icon: '/site-logo.png',
    shortcut: '/site-logo.png',
    apple: '/site-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
