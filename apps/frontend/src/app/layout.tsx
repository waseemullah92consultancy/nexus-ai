import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReduxProvider } from '@/store';
import { ThemeProvider } from '@/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NexusAI - AI Model Marketplace',
  description: 'Discover and use the best AI models from leading research labs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}