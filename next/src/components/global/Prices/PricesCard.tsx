import TextBlock from '@/components/ui/TextBlock';
import { HighlightedIcon } from '@/components/icons';
import type { PricesCardTypes } from './Prices.types';
import styles from './Prices.module.scss';

export default function PricesCard({ index, heading, prices, highlightedLabel }: PricesCardTypes & { index: number }) {
  return (
    <div
      className={styles['PricesCard']}
      data-highlighted={!!highlightedLabel}
    >
      {highlightedLabel && (
        <span className='text-m light'>
          <HighlightedIcon />
          {highlightedLabel}
        </span>
      )}
      <TextBlock
        tag={index === 0 ? 'h3' : 'h4'}
        value={heading}
        className='text-xl light'
      />
      <ul>
        {prices.map(({ name, price }, i) => (
          <li key={`price-${i}`}>
            <TextBlock
              value={price}
              tag='span'
            />
            <TextBlock
              value={name}
              tag='span'
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
