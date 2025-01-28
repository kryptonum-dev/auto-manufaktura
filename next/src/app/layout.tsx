import { GoogleTagManager } from '@next/third-parties/google';
import '@/global/global.scss';
import { PublicSans } from '@/global/fonts';
import { LOCALE } from '@/global/constants';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import CookieConsent from '@/components/global/CookieConsent';
import PageTransition from '@/components/ui/PageTransition';
import SchemaOrganization from '@/global/schema/Organization';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LOCALE}>
      <body className={PublicSans.className}>
        <CookieConsent />
        <Header />
        <main id='main'>{children}</main>
        <Footer />
        <PageTransition />
        <SchemaOrganization />
      </body>
      {process.env.NODE_ENV === 'production' && <GoogleTagManager gtmId='GTM-KHGGHR95' />}
    </html>
  );
}
