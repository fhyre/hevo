import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hevo',
  description: 'Hevo',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-tr from-indigo-400 from-25% via-sky-300 via-50% to-emerald-500 to-90%`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
