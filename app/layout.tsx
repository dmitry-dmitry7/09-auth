import type { Metadata } from 'next';
import { Geist, Roboto } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const robotoFont = Roboto({
  variable: '--font-roboto',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Notes app',
  description: 'A simple note app built with Next.js, React Query',
  openGraph: {
    title: 'Notes app',
    description: 'A simple note app built with Next.js, React Query.',
    url: 'https://09-auth-one-lyart.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Og Image Alt',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${robotoFont.variable}`}>
      <body className={robotoFont.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
