import Button from '@/components/ui/Button';
import TransitionLink from '@/components/ui/TransitionLink';
import type { HeaderPropsTypes } from './Header.types';
import styles from './Header.module.scss';

export default function Header({ logo }: HeaderPropsTypes) {
  return (
    <>
      <header className={styles['Header']}>
        <div className='max-width'>
          <TransitionLink
            href='/'
            aria-label='Przejdź do strony głównej'
            className={styles.logo}
          >
            {logo}
          </TransitionLink>
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
