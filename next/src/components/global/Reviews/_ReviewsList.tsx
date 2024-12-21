'use client';
import { useState } from 'react';
import { formatDate } from '@/utils/format-date';
import TextBlock from '@/components/ui/TextBlock';
import Stars from '@/components/ui/Stars';
import type { ReviewsTypes } from './Reviews.types';
import styles from './Reviews.module.scss';

const COLORS = ['#0097A7', '#235696', '#DA4F7A', '#7D8F9B', '#7859BC', '#235696'];

export default function ReviewsList({
  index,
  reviews,
  icon,
}: {
  index: number;
  reviews: ReviewsTypes['reviews'];
  icon: React.ReactNode;
}) {
  const SubheadingTag = index === 0 ? 'h2' : 'h3';
  const [visible, setVisible] = useState(6);

  return (
    <>
      {reviews?.length > 0 && (
        <div className={styles.wrapper}>
          {reviews.slice(0, visible).map(({ username, date, review, rating }, i) => (
            <article
              key={`review-${i}`}
              className={styles.review}
            >
              <header>
                <span
                  className={styles.icon}
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                >
                  {username[0]}
                </span>
                <div>
                  <SubheadingTag className='light text-l'>{username}</SubheadingTag>
                  <Stars
                    rating={rating}
                    className={styles.stars}
                  />
                  {date && <p className='text-m light'>{formatDate(date)}</p>}
                </div>
              </header>
              <div className={styles.content}>
                <TextBlock value={review} />
              </div>
            </article>
          ))}
        </div>
      )}
      {visible < reviews.length && (
        <button
          aria-label={`Wczytaj wszystkie opinie (ilość opinii do załadowania: ${reviews.length - visible})`}
          className={styles.loadMore}
          onClick={() => setVisible(reviews.length)}
        >
          <div
            role='progressbar'
            aria-valuemin={0}
            aria-valuemax={reviews.length}
            aria-valuenow={visible}
            aria-label={`Załadowano ${visible} z ${reviews.length} opinii`}
          >
            <div style={{ width: `${(visible / reviews.length) * 100}%` }} />
          </div>
          <div className={styles.icons}>
            {reviews.slice(visible, visible + Math.min(4, reviews.length - visible)).map(({ username }, i) => (
              <span
                key={`load-more-icon-${i}`}
                style={{ backgroundColor: COLORS[(i + visible) % COLORS.length] }}
              >
                {username[0]}
              </span>
            ))}
            <span>{`+${Math.min(99, reviews.length - visible)}`}</span>
          </div>
          <span className='text-m light'>Wczytaj wszystkie {icon}</span>
        </button>
      )}
    </>
  );
}
