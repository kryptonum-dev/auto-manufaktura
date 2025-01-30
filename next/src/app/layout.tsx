import { GoogleTagManager } from '@next/third-parties/google';
import '@/global/global.scss';
import { PublicSans } from '@/global/fonts';
import { LOCALE } from '@/global/constants';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import CookieConsent from '@/components/global/CookieConsent';
import SchemaOrganization from '@/global/schema/Organization';
import WelcomeScreen from '@/components/ui/WelcomeScreen';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LOCALE}>
      <body className={PublicSans.className}>
        <WelcomeScreen />
        <CookieConsent />
        <Header />
        <main id='main'>{children}</main>
        <Footer />
        <SchemaOrganization />
      </body>
      {process.env.NODE_ENV === 'production' && <GoogleTagManager gtmId='GTM-KHGGHR95' />}
    </html>
  );
}
