import Stars from '@/components/ui/Stars';
import type { RatingBadgeTypes } from './RatingBadge.types';
import styles from './RatingBadge.module.scss';

export default function RatingBadge({
  userRatingsTotal,
  rating,
  url = '',
  prefix = '',
  className = '',
}: RatingBadgeTypes) {
  const Tag = url ? 'a' : 'div';
  return (
    <Tag
      className={`${styles['RatingBadge']} ${className}`}
      {...(url && {
        href: url,
        target: '_blank',
        rel: 'noreferrer',
        ['data-type']: 'link',
      })}
    >
      <span className={styles.icon}>
        <ArrowIcon />
      </span>
      <div className={`${styles.badge} ${prefix ? styles.withPrefix : ''}`}>
        {prefix && <span className={`${styles.prefix} text-m`}>{prefix}</span>}
        <div>
          <Stars
            rating={rating}
            className={styles.stars}
          />
          <span className='text-m light'>{`${rating.toFixed(1).replace('.', ',')} · ${getRatingLabel(userRatingsTotal)}`}</span>
        </div>
      </div>
    </Tag>
  );
}

const getRatingLabel = (number: number = 0) => {
  if (number >= 5) {
    return `${number} ocen`;
  } else if ([2, 3, 4].includes(number)) {
    return `${number} oceny`;
  } else if (number === 1) {
    return `${number} ocena`;
  } else {
    return 'Brak ocen';
  }
};

const ArrowIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={12}
    height={12}
    viewBox='0 0 12 12'
    fill='none'
    {...props}
  >
    <path
      stroke='#CBD0D0'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m3 9 6-6m0 0H4.5M9 3v4.5'
    />
  </svg>
);
