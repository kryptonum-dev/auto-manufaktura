import TextBlock from '@/components/ui/TextBlock';
import type { QuoteTypes } from './Quote.types';
import styles from './Quote.module.scss';

export default function Quote({ text, author }: QuoteTypes) {
  return (
    <blockquote className={styles['Quote']}>
      <span className={styles.icon}>
        <QuoteIcon />
      </span>
      <TextBlock value={text} />
      {author && <cite className='text-m light'>{author}</cite>}
    </blockquote>
  );
}

const QuoteIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={21}
    viewBox='0 0 20 21'
    fill='none'
    {...props}
  >
    <path
      fill='#CBD0D0'
      d='m11.101 16.635 3.235-7.076-2.39-.118v-5.93h6.179v5.167l-4.692 7.957H11.1Zm-8.601 0L5.706 9.56l-2.39-.118v-5.93h6.208v5.167l-4.692 7.957H2.5Z'
    />
  </svg>
);
