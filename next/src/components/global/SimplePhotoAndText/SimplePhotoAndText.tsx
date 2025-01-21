import { formatPhoneNumberForHref, formatPhoneNumber } from '@/utils/format-phone-number';
import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import type { SimplePhotoAndTextTypes } from './SimplePhotoAndText.types';
import styles from './SimplePhotoAndText.module.scss';

export default function SimplePhotoAndText({
  index,
  heading,
  content,
  image,
  cta,
  imagePosition,
  contact,
}: SimplePhotoAndTextTypes) {
  return (
    <section
      className={`${styles['SimplePhotoAndText']} max-width`}
      data-position={imagePosition}
    >
      <Img
        data={image}
        sizes='(min-width: 1177px) 457px, (min-width: 644px) 38.8vw, 250px)'
        priority={index === 0}
      />
      <div className={styles.content}>
        {heading && (
          <header>
            <TextBlock
              value={heading}
              tag={index === 0 ? 'h1' : 'h2'}
              className='heading-2xl'
            />
          </header>
        )}
        <div className={styles.text}>
          <TextBlock
            value={content}
            linkClassName='link'
            bulletListClassName='list-check-round'
          />
        </div>
        {contact && (
          <address className={styles.info}>
            {contact.type === 'department' ? (
              <p>
                <span>{contact.fullName}</span>
              </p>
            ) : (
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
            )}
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
          className={styles.button}
        />
      </div>
    </section>
  );
}
