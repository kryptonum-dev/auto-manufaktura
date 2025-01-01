import Link from 'next/link';
import { CheckIcon } from '@/components/icons';
import type { ChipTypes } from './Chip.types';
import styles from './Chip.module.scss';

export default function Chip({ tag, href, children, ...props }: ChipTypes) {
  const Element = href ? (href.startsWith('https://') ? 'a' : Link) : tag;
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
