import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/global/global.scss';
import { PublicSans } from '@/global/fonts';
import { LOCALE } from '@/global/constants';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import CookieConsent from '@/components/global/CookieConsent';
import PageTransition from '@/components/ui/PageTransition';
//import SchemaOrganization from '@/global/schema/Organization';
export const revalidate = 10;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LOCALE}>
      <body className={PublicSans.className}>
        <Header />
        <main id='main'>{children}</main>
        <Footer />
        <PageTransition />
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          limit={3}
          theme='dark'
          progressStyle={{ background: '#ff7100' }}
          toastStyle={{ background: '#111317' }}
        />
        <CookieConsent />
        {/* <SchemaOrganization /> */}
      </body>
    </html>
  );
}
