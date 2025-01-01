import { formatPhoneNumberForHref } from '@/utils/format-phone-number';
import { formatPhoneNumber } from '@/utils/format-phone-number';
import RatingBadge from '@/components/ui/RatingBadge';
import Img from '@/components/ui/Img';
import CopyToClipboard from '@/components/ui/CopyToClipboard';
import type { WorkshopCardTypes } from './WorkshopCard.types';
import styles from './WorkshopCard.module.scss';

export default function WorkshopCard({
  address,
  openingHours,
  googleData,
  tel,
  email,
  hasDepartments,
  departments,
  imgPriority = false,
}: WorkshopCardTypes) {
  return (
    <div className={styles['WorkshopCard']}>
      <div className={styles.map}>
        <Img
          data={address.mapImage}
          sizes='(min-width: 1000px) 256px, (min-width: 768px) 221px, 250px'
          priority={imgPriority}
        />
        <RatingBadge
          {...googleData}
          className={styles.rating}
        />
      </div>
      <div className={styles.content}>
        <p>
          {address.street.replace(/^(Ul\.|ul\.)\s*/, '').trim()}, {address.city}
        </p>
        <div className={`${styles.hours} text-m light`}>
          {openingHours.map(({ days, hours }, i) => (
            <p key={`hours-${i}`}>
              <span>{days}</span>
              <span>{hours}</span>
            </p>
          ))}
        </div>
        <div className={`${styles.departments} text-m light`}>
          <address>
            {hasDepartments && <p>Dział ogólny</p>}
            <a
              aria-label={`Zadzwoń na numer ${tel} (${address.street}, ${address.city})`}
              href={`tel:${formatPhoneNumberForHref(tel)}`}
            >
              {formatPhoneNumber(tel)}
            </a>
            <CopyToClipboard
              value={email}
              successMessage='E-mail został skopiowany'
              errorMessage='Nie udało się skopiować adresu e-mail'
            />
          </address>
          {hasDepartments &&
            departments?.map(({ tel, email, fullName }, i) => (
              <address key={`address-${i}`}>
                <p>{fullName}</p>
                <a
                  aria-label={`Zadzwoń na numer ${tel} (${fullName} - ${address.street}, ${address.city})`}
                  href={`tel:${formatPhoneNumberForHref(tel)}`}
                >
                  {formatPhoneNumber(tel)}
                </a>
                <CopyToClipboard
                  value={email}
                  successMessage='E-mail został skopiowany'
                  errorMessage='Nie udało się skopiować adresu e-mail'
                />
              </address>
            ))}
        </div>
      </div>
    </div>
  );
}
