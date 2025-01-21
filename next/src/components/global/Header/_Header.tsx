'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Light from '@/components/ui/Light';
import TransitionLink from '@/components/ui/TransitionLink';
import Img from '@/components/ui/Img';
import type { HeaderPropsTypes } from './Header.types';
import styles from './Header.module.scss';

export default function Header({ logo, nav, dropdownIcon }: HeaderPropsTypes) {
  const pathname = usePathname();
  const lightRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState('');
  const [opened, setOpened] = useState(false);

  const getAriaCurrent = (href: string, isPartialMatch = false) =>
    (isPartialMatch ? pathname.startsWith(href) : pathname === href) && 'page';

  const closeMenu = useCallback(() => {
    setOpened(false);
    setTab('');
    lightRef?.current?.classList.remove(styles.active);
  }, []);

  const openMenu = useCallback(() => setOpened(true), []);

  const handleTab = (selectedTab: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const isMobile = window.innerWidth < 1200;

    if (isMobile) {
      setTab(prevTab => (prevTab === selectedTab ? '' : selectedTab));
      return;
    }

    const isSameTab = tab === selectedTab;
    const lightElement = lightRef?.current;
    setTab(isSameTab ? '' : selectedTab);

    if (isSameTab) {
      lightElement?.classList.remove(styles.active);
      return;
    }

    const buttonElement = e.target as HTMLButtonElement;
    if (!lightElement || !buttonElement) return;

    const buttonRect = buttonElement.getBoundingClientRect();
    const left = buttonRect.left - (220 - buttonRect.width) / 2;

    lightElement.style.top = `${buttonRect.top}px`;
    lightElement.style.left = `${left}px`;
    lightElement.classList.add(styles.active);
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu();
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [closeMenu]);

  useEffect(() => {
    let lastScrollY = NaN;

    const updateLightPosition = () => {
      const lightElement = lightRef?.current;
      if (!lightElement) return;
      const buttonElement = lightElement.nextElementSibling?.querySelector(
        `.${styles.tab}[data-active='true'] button`
      ) as HTMLButtonElement;
      if (!buttonElement) return;
      lightElement.style.top = `${buttonElement.getBoundingClientRect().top}px`;
    };

    const scrollHandler = () => {
      if (!opened && !tab) return;
      const currentScrollY = window.scrollY;
      if (isNaN(lastScrollY)) lastScrollY = currentScrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 80) {
        closeMenu();
      } else if (tab && window.innerWidth >= 1200) {
        updateLightPosition();
      }
    };

    document.addEventListener('scroll', scrollHandler, { passive: true });
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [closeMenu, opened, tab]);

  const { services, carBrands, blogPage, careerPage, contactPage, pricingPage, aboutPage } = nav;

  return (
    <>
      <div
        ref={lightRef}
        className={styles.light}
      >
        <Light size='xsmall' />
      </div>
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
                  <span className={styles.name}>{name}</span>
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
                            sizes={getImageSizes(list.length + 1)}
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
                              sizes={getImageSizes(list.length + 1)}
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
                <span className={styles.name}>Obsługiwane marki</span>
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
                            sizes={getImageSizes(carBrands.length)}
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
              <span className={styles.name}>{pricingPage.name}</span>
            </TransitionLink>
            <TransitionLink
              className={styles.link}
              href={aboutPage.path}
              aria-current={getAriaCurrent(aboutPage.path)}
              onClick={closeMenu}
            >
              <span className={styles.name}>{aboutPage.name}</span>
            </TransitionLink>
            <TransitionLink
              className={styles.link}
              href={careerPage.path}
              aria-current={getAriaCurrent(careerPage.path)}
              onClick={closeMenu}
            >
              <span className={styles.name}>{careerPage.name}</span>
            </TransitionLink>
            <TransitionLink
              className={styles.link}
              href={blogPage.path}
              aria-current={getAriaCurrent(blogPage.path, true)}
              onClick={closeMenu}
            >
              <span className={styles.name}>{blogPage.name}</span>
            </TransitionLink>
          </nav>
          <Button
            href={contactPage.path}
            text={contactPage.name}
            theme='primary'
            linkType='internal'
            className={styles.cta}
            onClick={closeMenu}
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

function getImageSizes(totalElements: number): string {
  return totalElements > 9
    ? '(min-width: 1200px) 88px, (min-width: 768px) 56px, (min-width: 658px) 7.3vw, 48px'
    : '(min-width: 1200px) 94px, (min-width: 768px) 80px, (min-width: 614px) 10.4vw, 64px';
}
