import Link from 'next/link';
import { CheckIcon } from '@/components/icons';
import type { ChipTypes } from './Chip.types';
import styles from './Chip.module.scss';

export default function Chip({ tag, href, children, ...props }: ChipTypes) {
  if (!href) {
    const Element = tag;
    return (
      <Element
        {...props}
        className={styles['Chip']}
      >
        <div>
          <CheckIcon />
          {children}
        </div>
      </Element>
    );
  }

  const Element = href.startsWith('https://') ? 'a' : Link;
  return (
    <Element
      href={href || ''}
      {...props}
      className={styles['Chip']}
    >
      <div>
        <CheckIcon />
        {children}
      </div>
    </Element>
  );
}
