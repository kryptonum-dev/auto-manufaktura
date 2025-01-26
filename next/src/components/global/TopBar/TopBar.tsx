import { formatPhoneNumber, formatPhoneNumberForHref } from '@/utils/format-phone-number';
import TextBlock from '@/components/ui/TextBlock';
import type { TopBarTypes } from './TopBar.types';
import styles from './TopBar.module.scss';

export default function TopBar({ annotation, additionalContact, contacts }: TopBarTypes) {
  return (
    <aside className={`${styles['TopBar']} max-width text-m light`}>
      <div className={styles.locations}>
        {annotation && (
          <TextBlock
            tag='p'
            value={annotation}
            className={styles.annotation}
          />
        )}
        <address>
          {contacts.map(({ tel, address, url }, i) => (
            <p key={i}>
              <a
                href={url}
                target='_blank'
                rel='noreferrer'
              >
                {/^ul\./i.test(address.trim()) ? address : `Ul. ${address.trim()}`}
              </a>{' '}
              <a
                aria-label={`Zadzwoń na numer ${tel} (${address})`}
                href={`tel:${formatPhoneNumberForHref(tel)}`}
              >
                {formatPhoneNumber(tel)}
              </a>
            </p>
          ))}
        </address>
      </div>
      {additionalContact && (
        <address className={styles.additional}>
          <span>{additionalContact.fullName}</span>{' '}
          <a
            aria-label={`Zadzwoń do ${additionalContact.fullName}: ${additionalContact.tel}`}
            href={`tel:${formatPhoneNumberForHref(additionalContact.tel)}`}
          >
            {formatPhoneNumber(additionalContact.tel)}
          </a>
        </address>
      )}
    </aside>
  );
}
