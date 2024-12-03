import Button from '@/components/ui/Button';
import TextBlock from '@/components/ui/TextBlock';
import Light from '@/components/ui/Light';
import type { FullCtaBoxTypes } from './FullCtaBox.types';
import styles from './FullCtaBox.module.scss';

export default function FullCtaBox({ mainText, secondaryText, cta }: FullCtaBoxTypes) {
  return (
    <div className={styles['FullCtaBox']}>
      <Light className={styles.light} />
      <div className={styles.content}>
        <p>
          <TextBlock
            tag='span'
            className='text-m light'
            value={mainText}
          />
          {secondaryText && (
            <TextBlock
              tag='span'
              className='text-m'
              value={secondaryText}
            />
          )}
        </p>
        <Button {...cta} />
      </div>
    </div>
  );
}
