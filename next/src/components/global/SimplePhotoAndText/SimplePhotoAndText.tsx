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
        {contact &&
          contact.length > 0 &&
          contact.map(({ type, fullName = '', address = '', url = '', email, tel }, i) => (
            <address
              className={styles.info}
              key={i}
            >
              {type === 'department' ? (
                <p>
                  <span>{fullName}</span>
                </p>
              ) : (
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
              )}
              <p>
                <span>Telefon:</span>{' '}
                <a
                  aria-label={`Zadzwoń na numer ${tel}`}
                  href={`tel:${formatPhoneNumberForHref(tel)}`}
                >
                  {formatPhoneNumber(tel)}
                </a>
              </p>
              <p>
                <span>E-mail:</span>{' '}
                <a
                  aria-label={`Wyślij e-mail na adres ${email}`}
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </p>
            </address>
          ))}
        <Button
          {...cta}
          className={styles.button}
        />
      </div>
    </section>
  );
}
