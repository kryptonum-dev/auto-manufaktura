import Script from 'next/script';
import Content from './_Content';

export default function CookieConsent() {
  return (
    <>
      <Script id='gtag'>
        {'window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}'}
      </Script>
      <Content />
    </>
  );
}
