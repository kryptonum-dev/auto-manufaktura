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
  console.log(consent);
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
              <h2 className='text-xl light'>Informacja o cookies</h2>
              <p>
                Korzystamy z&nbsp;cookie i&nbsp;podobnych technologii, by analizować ruch na stronie, dopasować ją do
                Ciebie i&nbsp;wyświetlać trafniejsze reklamy. Dane zapisywane w&nbsp;cookie udostępniamy zaufanym
                partnerom, którzy mogą połączyć je z&nbsp;posiadanymi informacjami o&nbsp;Tobie.
              </p>
            </div>
            <div
              className={styles.details}
              data-active={activeTab === 'details'}
              id='details'
              role='tabpanel'
            >
              <div>
                <Switch
                  id='analytics'
                  defaultChecked
                >
                  Statistical (9)
                </Switch>
                <div className={styles.text}>
                  <p>
                    Statistical cookies help us understand how visitors interact with the website, where they come from,
                    and how they come back. Collecting and reporting information is anonymous.
                  </p>
                  <div>
                    <p>Google</p>
                    <div className={`${styles.col} text-m light`}>
                      <div>
                        <p>__utmb</p>
                        <p>
                          Saves the exact timestamp of the moment when the user entered the site. It is used by Google
                          Analytics to calculate the duration of a visit.
                        </p>
                        <p>
                          <span>Expiry: 1 day</span>
                          <span>Type: HTTP</span>
                        </p>
                      </div>
                      <div>
                        <p>__utmb</p>
                        <p>
                          Saves the exact timestamp of the moment when the user entered the site. It is used by Google
                          Analytics to calculate the duration of a visit.
                        </p>
                        <p>
                          <span>Expiry: 1 day</span>
                          <span>Type: HTTP</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Switch id='marketing'>Marketing (5)</Switch>
                <div className={styles.text}>
                  <p>
                    Statistical cookies help us understand how visitors interact with the website, where they come from,
                    and how they come back. Collecting and reporting information is anonymous.
                  </p>
                  <div>
                    <p>Google</p>
                    <div className={`${styles.col} text-m light`}>
                      <div>
                        <p>__utmb</p>
                        <p>
                          Saves the exact timestamp of the moment when the user entered the site. It is used by Google
                          Analytics to calculate the duration of a visit.
                        </p>
                        <p>
                          <span>Expiry: 1 day</span>
                          <span>Type: HTTP</span>
                        </p>
                      </div>
                      <div>
                        <p>__utmb</p>
                        <p>
                          Saves the exact timestamp of the moment when the user entered the site. It is used by Google
                          Analytics to calculate the duration of a visit.
                        </p>
                        <p>
                          <span>Expiry: 1 day</span>
                          <span>Type: HTTP</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Switch
                  id='necessary'
                  checked
                  disabled
                >
                  Necessary (3)
                </Switch>
                <div className={styles.text}>
                  <p>
                    Statistical cookies help us understand how visitors interact with the website, where they come from,
                    and how they come back. Collecting and reporting information is anonymous.
                  </p>
                  <div>
                    <p>Google</p>
                    <div className={`${styles.col} text-m light`}>
                      <div>
                        <p>__utmb</p>
                        <p>
                          Saves the exact timestamp of the moment when the user entered the site. It is used by Google
                          Analytics to calculate the duration of a visit.
                        </p>
                        <p>
                          <span>Expiry: 1 day</span>
                          <span>Type: HTTP</span>
                        </p>
                      </div>
                      <div>
                        <p>__utmb</p>
                        <p>
                          Saves the exact timestamp of the moment when the user entered the site. It is used by Google
                          Analytics to calculate the duration of a visit.
                        </p>
                        <p>
                          <span>Expiry: 1 day</span>
                          <span>Type: HTTP</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Switch
                  id='preferences'
                  defaultChecked
                >
                  Preferences
                </Switch>
                <div className={styles.text}>
                  <p>
                    Statistical cookies help us understand how visitors interact with the website, where they come from,
                    and how they come back. Collecting and reporting information is anonymous.
                  </p>
                </div>
              </div>
              <div>
                <Switch
                  id='unclassified'
                  defaultChecked
                >
                  Unclassified
                </Switch>
                <div className={styles.text}>
                  <p>
                    Statistical cookies help us understand how visitors interact with the website, where they come from,
                    and how they come back. Collecting and reporting information is anonymous.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={styles.about}
              data-active={activeTab === 'about'}
              id='about'
              role='tabpanel'
            >
              <h2 className='text-xl light'>About cookies</h2>
              <p>
                Cookies are small text files stored on your device. Their task is to allow us and our partners to
                identify your device and make your experience more efficient.
              </p>
              <p>
                Some cookies are necessary for the website to function properly, some support content personalization,
                and others serve analytical and advertising purposes. By law, we can store cookies on your device if
                they are strictly necessary for operating our website, but we need your consent for other cookies. We
                may also use other technologies that work similarly, without cookies, fulfilling the purposes described
                in the Details section. If you give it, your consent will also apply.
              </p>
              <p>
                You can change or withdraw your consent at any time by going to the Manage Cookies in our websites
                footer. In our Privacy Policy, you can also learn more about who we are, how you can contact us, and how
                we process your personal data.
              </p>
              <p>
                You can also delete cookies, block their use by your browser or use the private (incognito) browsing
                mode, in which cookies are deleted after closing the browser window. These actions should not
                significantly affect the operation of the essential features of our website. You can find more
                information on how to do this in your browsers help tab.
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
              Ustaw preferencje
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
