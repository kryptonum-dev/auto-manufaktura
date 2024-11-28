import { formatPhoneNumber, formatPhoneNumberForHref } from '@/utils/format-phone-number';
import TextBlock from '@/components/ui/TextBlock';
import type { TopBarTypes } from './TopBar.types';
import styles from './TopBar.module.scss';

export default function TopBar({ annotation, isReference, additionalContact, contacts }: TopBarTypes) {
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
          {contacts.map(({ tel, name }, i) => (
            <p key={i}>
              {!isReference ? (
                <span>{name}</span>
              ) : (
                <span>{/^ul\./i.test(name.trim()) ? name : `Ul. ${name.trim()}`}</span>
              )}{' '}
              <a
                aria-label={`Zadzwoń na numer ${tel} (${name})`}
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
          <span>{additionalContact.name}</span>{' '}
          <a
            aria-label={`Zadzwoń do ${additionalContact.name}: ${additionalContact.tel}`}
            href={`tel:${formatPhoneNumberForHref(additionalContact.tel)}`}
          >
            {formatPhoneNumber(additionalContact.tel)}
          </a>
        </address>
      )}
    </aside>
  );
}
