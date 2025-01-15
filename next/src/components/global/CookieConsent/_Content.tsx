'use client';
import { useState, useRef, useEffect } from 'react';
import { getCookie } from '@/utils/get-cookie';
import { setCookie } from '@/utils/set-cookie';
import Button from '@/components/ui/Button';
import Switch from '@/components/ui/Switch';
import styles from './CookieConsent.module.scss';

type Consent = {
  necessary: boolean;
  marketing: boolean;
  analytics: boolean;
  preferences: boolean;
};

function setConsent(consent: Consent) {
  const consentMode = {
    functionality_storage: consent.necessary ? 'granted' : 'denied',
    security_storage: consent.necessary ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    personalization_storage: consent.preferences ? 'granted' : 'denied',
  } as const;
  //gtag('consent', 'update', consentMode);
  setCookie('cookie-consent', JSON.stringify(consentMode), 365);
}

export default function Content() {
  const wrapper = useRef<HTMLElement>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [activeTab, setActiveTab] = useState<'consent' | 'details' | 'about'>('consent');

  useEffect(() => {
    if (getCookie('cookie-consent') === null) {
      // gtag('consent', 'default', {
      //   functionality_storage: 'denied',
      //   security_storage: 'denied',
      //   ad_storage: 'denied',
      //   ad_user_data: 'denied',
      //   ad_personalization: 'denied',
      //   analytics_storage: 'denied',
      //   personalization_storage: 'denied',
      // });
      setShowBanner(true);
    } //else {
    //gtag('consent', 'default', JSON.parse(getCookie('cookie-consent')!));
    //}
  }, []);

  const acceptAll = () => {
    setConsent({
      necessary: true,
      marketing: true,
      analytics: true,
      preferences: true,
    });
    setShowBanner(false);
  };

  const rejectAll = () => {
    setConsent({
      necessary: false,
      marketing: false,
      analytics: false,
      preferences: false,
    });
    setShowBanner(false);
  };

  const acceptPart = () => {
    setConsent({
      necessary: true,
      preferences: wrapper.current?.querySelector<HTMLInputElement>('input[id="preferences"]')?.checked || false,
      analytics: wrapper.current?.querySelector<HTMLInputElement>('input[id="analytics"]')?.checked || false,
      marketing: wrapper.current?.querySelector<HTMLInputElement>('input[id="marketing"]')?.checked || false,
    });
    setShowBanner(false);
  };

  return (
    <aside
      className={styles['CookieConsent']}
      aria-hidden={!showBanner}
      ref={wrapper}
    >
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div
          className={styles.tabs}
          role='tablist'
        >
          <button
            role='tab'
            aria-selected={activeTab === 'consent'}
            aria-controls='consent'
            onClick={() => setActiveTab('consent')}
            className='text-m'
          >
            Zgoda
          </button>
          <button
            role='tab'
            aria-selected={activeTab === 'details'}
            aria-controls='details'
            onClick={() => setActiveTab('details')}
            className='text-m'
          >
            Szczegóły
          </button>
          <button
            role='tab'
            aria-selected={activeTab === 'about'}
            aria-controls='about'
            onClick={() => setActiveTab('about')}
            className='text-m'
          >
            O cookies
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.main}>
            <div
              className={styles.consent}
              data-active={activeTab === 'consent'}
              id='consent'
              role='tabpanel'
            >
              <p>
                Korzystamy z&nbsp;plików cookie, aby zapewnić prawidłowe funkcjonowanie naszej strony oraz dostosować
                jej działanie do Twoich potrzeb.
              </p>
            </div>
            <div
              className={styles.details}
              data-active={activeTab === 'details'}
              id='details'
              role='tabpanel'
            >
              <p>
                Poniżej znajdziesz informacje o&nbsp;tym, jakie dane i&nbsp;w&nbsp;jakim celu zbieramy. Nie musisz
                wyrażać zgody na wszystkie rodzaje plików cookie - w&nbsp;każdej chwili możesz zmienić swoje ustawienia.
              </p>
              <div>
                <Switch
                  id='necessary'
                  checked
                  disabled
                >
                  Niezbędne
                </Switch>
                <p className={styles.text}>
                  Są one kluczowe dla prawidłowego funkcjonowania strony. Dzięki nim możliwe jest korzystanie
                  z&nbsp;podstawowych funkcji, takich jak nawigacja czy dostęp do bezpiecznych obszarów serwisu.
                </p>
              </div>
              <div>
                <Switch
                  id='preferences'
                  defaultChecked
                >
                  Preferencyjne
                </Switch>
                <p className={styles.text}>
                  Pozwalają stronie zapamiętać Twoje ustawienia (język, region czy inne indywidualne preferencje).
                  Dzięki nim korzystanie z&nbsp;witryny staje się bardziej komfortowe i&nbsp;spersonalizowane.
                </p>
              </div>
              <div>
                <Switch
                  id='analytics'
                  defaultChecked
                >
                  Analityczne
                </Switch>
                <p className={styles.text}>
                  Pliki te pomagają nam zrozumieć, w&nbsp;jaki sposób użytkownicy korzystają z&nbsp;naszej strony.
                  Dzięki analizie interakcji możemy dostosowywać zawartość witryny do Twoich oczekiwań i&nbsp;stale ją
                  udoskonalać.
                </p>
              </div>
              <div>
                <Switch id='marketing'>Marketingowe</Switch>
                <p className={styles.text}>
                  Umożliwiają monitorowanie Twojej aktywności na różnych stronach www. Dzięki nim możemy wyświetlać
                  reklamy dopasowane do Twoich zainteresowań, co czyni je bardziej przydatnymi i&nbsp;angażującymi.
                </p>
              </div>
            </div>
            <div
              className={styles.about}
              data-active={activeTab === 'about'}
              id='about'
              role='tabpanel'
            >
              <h2 className='text-xl light'>Zarządzanie plikami cookie</h2>
              <p>
                Ty decydujesz, jakie pliki cookie są przechowywane na Twoim urządzeniu. Możesz je dostosować lub
                zablokować w&nbsp;ustawieniach przeglądarki. Pamiętaj, że wyłączenie niektórych plików może negatywnie
                wpłynąć na działanie naszej strony.
              </p>
            </div>
          </div>
          <div className={styles.controls}>
            <button onClick={rejectAll}>Odmowa</button>
            <button
              onClick={() => {
                if (activeTab === 'details') {
                  acceptPart();
                } else {
                  setActiveTab('details');
                }
              }}
            >
              {activeTab === 'details' ? 'Zapisz' : 'Ustaw preferencje'}
            </button>
            <Button
              text='Zgoda na wszystkie'
              onClick={acceptAll}
              theme='primary'
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
