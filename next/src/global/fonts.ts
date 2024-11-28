import { Public_Sans } from 'next/font/google';

export const PublicSans = Public_Sans({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  display: 'swap',
});
