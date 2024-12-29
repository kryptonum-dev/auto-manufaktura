'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TransitionLink from '@/components/ui/TransitionLink';
import Button from '@/components/ui/Button';
import { ArrowDownIcon } from '@/components/icons';
import { FooterQueryTypes } from './Footer.types';
import styles from './Footer.module.scss';

function NavLinks({ links }: { links: React.ReactNode[] }) {
  const [visible, setVisible] = useState(7);
  return (
    <div className={styles.list}>
      {(links.length > 8 ? links.slice(0, visible) : links).map(link => link)}
      {links.length > 8 && (
        <button
          className={`${styles.loadMore} text-m light`}
          data-visible={visible > 7}
          onClick={() => setVisible(prev => (prev === 7 ? links.length : 7))}
        >
          {visible === 7 ? (
            <>
              <span>Wczytaj więcej</span>
              <span>({links.length - 7})</span>
            </>
          ) : (
            <span>Pokaż mniej</span>
          )}
          <ArrowDownIcon className={styles.icon} />
        </button>
      )}
    </div>
  );
}

export default function Navigation({
  services,
  carBrands,
  locations,
  blogPage,
  careerPage,
  aboutPage,
  contactPage,
  pricingPage,
}: FooterQueryTypes) {
  const pathname = usePathname();

  const getAriaCurrent = (href: string, isPartialMatch: boolean = false) =>
    (isPartialMatch ? pathname.startsWith(href) : pathname === href) && 'page';

  const renderLink = ({ path, name }: { path: string; name: string }): React.ReactNode => (
    <TransitionLink
      href={path}
      key={path}
      aria-current={getAriaCurrent(path)}
      className={styles.link}
    >
      {name}
    </TransitionLink>
  );

  return (
    <nav
      aria-label='Nawigacja w stopce'
      className='max-width'
    >
      {services.map(({ name, path, list }, i) => (
        <div
          key={i}
          className={styles.service}
        >
          <TransitionLink
            href={path}
            aria-current={getAriaCurrent(path)}
            className={styles.link}
          >
            {name}
          </TransitionLink>
          <div className={styles.list}>{list.map(link => renderLink(link))}</div>
        </div>
      ))}
      <div className={styles.carBrands}>
        <p>Obsługiwane marki</p>
        <NavLinks links={carBrands.map(link => renderLink(link))} />
      </div>
      <div className={styles.locations}>
        <p>Działamy w okolicy</p>
        <div className={styles.list}>{locations.map(link => renderLink(link))}</div>
      </div>
      <div className={styles.pages}>
        <Button
          text={contactPage.name}
          href={contactPage.path}
          className={styles.button}
        />
        <div className={styles.list}>
          <TransitionLink
            href={careerPage.path}
            aria-current={getAriaCurrent(careerPage.path)}
            data-badge={careerPage.isHiring}
            className={styles.link}
          >
            <span>{careerPage.name}</span>
            {careerPage.isHiring && <span className='text-m light'>Zatrudniamy</span>}
          </TransitionLink>
          <TransitionLink
            href={pricingPage.path}
            aria-current={getAriaCurrent(pricingPage.path)}
            className={styles.link}
          >
            {pricingPage.name}
          </TransitionLink>
          <TransitionLink
            href={aboutPage.path}
            aria-current={getAriaCurrent(aboutPage.path)}
            className={styles.link}
          >
            {aboutPage.name}
          </TransitionLink>
          <TransitionLink
            href={blogPage.path}
            aria-current={getAriaCurrent(blogPage.path, true)}
            className={styles.link}
          >
            {blogPage.name}
          </TransitionLink>
        </div>
      </div>
    </nav>
  );
}
