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
        {contact &&
          contact.length > 0 &&
          contact.map(({ url, address, email, tel }, i) => (
            <address key={i}>
              <p>
                <span>Oddział</span>{' '}
                <a
                  href={url}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.workshopLink}
                >
                  {/^ul\./i.test(address.trim()) ? address : `ul. ${address.trim()}`}
                </a>
              </p>
              <p>
                <span>Telefon:</span>{' '}
                <a
                  aria-label={`Zadzwoń na numer ${tel} (${address})`}
                  href={`tel:${formatPhoneNumberForHref(tel)}`}
                >
                  {formatPhoneNumber(tel)}
                </a>
              </p>
              <p>
                <span>E-mail:</span>{' '}
                <a
                  aria-label={`Wyślij e-mail na adres ${email} (${address})`}
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </p>
            </address>
          ))}
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
