import { formatPrice } from '@/utils/format-price';
import TextBlock from '@/components/ui/TextBlock';
import Button from '@/components/ui/Button';
import type { PriceTableTypes } from './PriceTable.types';
import styles from './PriceTable.module.scss';

export default function PriceTable({ index, heading, note, priceDetails, ctaBox }: PriceTableTypes) {
  return (
    <section className={styles['PriceTable']}>
      <div
        className={styles.circle}
        data-style='orange'
      />
      <div
        className={styles.circle}
        data-style='blue'
      />
      <div className={`${styles.wrapper} max-width`}>
        <div className={styles.content}>
          <div className={styles.table}>
            <TextBlock
              tag={index === 0 ? 'h1' : 'h2'}
              value={heading}
              className='text-l'
            />
            <div className='text-m light'>
              <ul>
                <li>
                  <span>Robocizna</span>
                  <span>{priceDetails.work}</span>
                </li>
                {priceDetails.parts && (
                  <li>
                    <span>Części</span>
                    <span>{priceDetails.parts}</span>
                  </li>
                )}
                <li>
                  <span>VAT</span>
                  <span>{priceDetails.vat}</span>
                </li>
              </ul>
              <p className={styles.total}>
                <span>Całość</span>
                <span>{formatPrice(priceDetails.work + (priceDetails.parts || 0) + priceDetails.vat)}</span>
              </p>
            </div>
          </div>
          {note && (
            <TextBlock
              value={note}
              className='text-m light'
            />
          )}
        </div>
        <div className={styles.cta}>
          <TextBlock value={ctaBox.text} />
          <Button
            {...ctaBox.cta}
            className={styles.btn}
          />
        </div>
      </div>
    </section>
  );
}
