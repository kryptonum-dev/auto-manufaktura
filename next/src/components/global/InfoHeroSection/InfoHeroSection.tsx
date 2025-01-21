import { formatPhoneNumberForHref, formatPhoneNumber } from '@/utils/format-phone-number';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import type { InfoHeroSectionTypes } from './InfoHeroSection.types';
import styles from './InfoHeroSection.module.scss';

export default function InfoHeroSection({
  index,
  breadcrumbs,
  heading,
  content,
  image,
  logo,
  cta,
  contact,
}: InfoHeroSectionTypes) {
  return (
    <section className={`${styles['InfoHeroSection']} max-width`}>
      <div className={styles.content}>
        {breadcrumbs && <Breadcrumbs data={breadcrumbs} />}
        <header>
          {logo && (
            <Img
              data={logo}
              sizes='56px'
            />
          )}
          <TextBlock
            value={heading}
            tag={index === 0 ? 'h1' : 'h2'}
            className='heading-2xl'
          />
        </header>
        <div className={styles.text}>
          <TextBlock
            value={content}
            bulletListClassName='list-check-round'
          />
        </div>
        {contact && (
          <address>
            <p>
              <span>Lokalizacja:</span>{' '}
              <a
                href={contact.url}
                target='_blank'
                rel='noreferrer'
              >
                {/^ul\./i.test(contact.address.trim()) ? contact.address : `ul. ${contact.address.trim()}`}
              </a>
            </p>
            <p>
              <span>Telefon:</span>{' '}
              <a
                aria-label={`Zadzwoń na numer ${contact.tel} (${contact.address})`}
                href={`tel:${formatPhoneNumberForHref(contact.tel)}`}
              >
                {formatPhoneNumber(contact.tel)}
              </a>
            </p>
            <p>
              <span>E-mail:</span>{' '}
              <a
                aria-label={`Wyślij e-mail na adres ${contact.email} (${contact.address})`}
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            </p>
          </address>
        )}
        <Button
          {...cta}
          className={styles.btn}
        />
      </div>
      <Img
        data={image}
        sizes='(min-width: 768px) 643px, (min-width: 320px) 94vw, 296px'
        priority={index === 0}
      />
    </section>
  );
}
