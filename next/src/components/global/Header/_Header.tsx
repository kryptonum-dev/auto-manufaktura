'use client';
import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import TransitionLink from '@/components/ui/TransitionLink';
import Img from '@/components/ui/Img';
import type { HeaderPropsTypes } from './Header.types';
import styles from './Header.module.scss';

export default function Header({ logo, nav, dropdownIcon }: HeaderPropsTypes) {
  const pathname = usePathname();
  const [tab, setTab] = useState('');
  const [opened, setOpened] = useState(false);

  const getAriaCurrent = (href: string, isPartialMatch = false) =>
    (isPartialMatch ? pathname.startsWith(href) : pathname === href) && 'page';

  const closeMenu = useCallback(() => {
    setOpened(false);
    setTab('');
  }, []);

  const openMenu = useCallback(() => setOpened(true), []);

  const handleTab = (tab: string) => () => setTab(prevTab => (prevTab === tab ? '' : tab));

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu();
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [closeMenu]);

  useEffect(() => {
    const scrollHandler = () => opened && closeMenu();
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [closeMenu, opened]);

  const { services, carBrands, blogPage, careerPage, contactPage, pricingPage, aboutPage } = nav;

  return (
    <>
      <header
        className={styles['Header']}
        data-opened={opened}
      >
        <div className='max-width'>
          <TransitionLink
            href='/'
            aria-label='Przejdź do strony głównej'
            className={styles.logo}
            onClick={closeMenu}
          >
            {logo}
          </TransitionLink>
          <nav
            id='primary-navigation'
            className={styles.navigation}
          >
            {services.map(({ name, path, image, list }) => (
              <div
                className={styles.tab}
                key={name}
                data-active={name === tab}
              >
                <button onClick={handleTab(name)}>
                  <span>{name}</span>
                  <span className={styles.icon}>{dropdownIcon}</span>
                </button>
                <div
                  className={styles.tabpanel}
                  data-large={list.length + 1 > 9}
                  style={{ '--amount': `${list.length + 1}` } as React.CSSProperties}
                >
                  <ul>
                    <li>
                      <TransitionLink
                        aria-current={getAriaCurrent(path)}
                        href={path}
                        onClick={closeMenu}
                      >
                        <span className={styles.img}>
                          <Img
                            data={image}
                            sizes=''
                          />
                        </span>
                        <span>{name}</span>
                      </TransitionLink>
                    </li>
                    {list.map(({ name, path, image }) => (
                      <li key={path}>
                        <TransitionLink
                          href={path}
                          aria-current={getAriaCurrent(path)}
                          onClick={closeMenu}
                        >
                          <span className={styles.img}>
                            <Img
                              data={image}
                              sizes=''
                            />
                          </span>
                          <span>{name}</span>
                        </TransitionLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div
              className={styles.tab}
              data-active={'carBrands' === tab}
            >
              <button onClick={handleTab('carBrands')}>
                <span>Obsługiwane marki</span>
                <span className={styles.icon}>{dropdownIcon}</span>
              </button>
              <div
                className={styles.tabpanel}
                data-large={carBrands.length > 9}
                style={{ '--amount': `${carBrands.length}` } as React.CSSProperties}
              >
                <ul>
                  {carBrands.map(({ name, path, image }) => (
                    <li key={path}>
                      <TransitionLink
                        href={path}
                        aria-current={getAriaCurrent(path)}
                        onClick={closeMenu}
                      >
                        <span className={styles.img}>
                          <Img
                            data={image}
                            sizes=''
                          />
                        </span>
                        <span>{name}</span>
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <TransitionLink
              className={styles.link}
              href={pricingPage.path}
              aria-current={getAriaCurrent(pricingPage.path)}
              onClick={closeMenu}
            >
              <span>{pricingPage.name}</span>
            </TransitionLink>
            <TransitionLink
              className={styles.link}
              href={aboutPage.path}
              aria-current={getAriaCurrent(aboutPage.path)}
              onClick={closeMenu}
            >
              <span>{aboutPage.name}</span>
            </TransitionLink>
            <TransitionLink
              className={styles.link}
              href={careerPage.path}
              aria-current={getAriaCurrent(careerPage.path)}
              onClick={closeMenu}
            >
              <span>{careerPage.name}</span>
            </TransitionLink>
            <TransitionLink
              className={styles.link}
              href={blogPage.path}
              aria-current={getAriaCurrent(blogPage.path, true)}
              onClick={closeMenu}
            >
              <span>{blogPage.name}</span>
            </TransitionLink>
          </nav>
          <Button
            href={contactPage.path}
            text={contactPage.name}
            theme='primary'
            linkType='internal'
            className={styles.cta}
          />
          <button
            className={styles.menuButton}
            aria-controls='primary-navigation'
            aria-expanded={opened}
            onClick={() => (opened ? closeMenu() : openMenu())}
            aria-label={opened ? 'Zamknij nawigację' : 'Pokaż nawigację'}
          >
            <span></span>
          </button>
          <div
            className={styles.overlay}
            onClick={closeMenu}
          />
        </div>
      </header>
    </>
  );
}
