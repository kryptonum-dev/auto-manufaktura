import Link from 'next/link';
import Button from '@/components/ui/Button';
import type { HeaderPropsTypes } from './Header.types';
import styles from './Header.module.scss';

export default function Header({ logo }: HeaderPropsTypes) {
  return (
    <>
      <header className={styles['Header']}>
        <div className='max-width'>
          <Link
            href='/'
            aria-label='Przejdź do strony głównej'
            className={styles.logo}
          >
            {logo}
          </Link>
          <Button
            href='/kontakt'
            text='Kontakt'
            theme='primary'
            linkType='internal'
            className={styles.cta}
          />
        </div>
      </header>
    </>
  );
}
