import { DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ThemeProvider from '../components/providers/ThemeProvider';
import { Suspense } from 'react';
import ToastProvider from '@/components/providers/ToastProvider';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'BookNook | Your Online Library',
    template: '%s | BookNook',
  },
  description:
    'Discover, explore, and borrow your favorite books with BookNook, your online library.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Suspense>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
