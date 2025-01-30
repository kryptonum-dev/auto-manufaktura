import Link from 'next/link';
import Img from '@/components/ui/Img';
import { HighlightedIcon } from '@/components/icons';
import type { ServiceCardTypes } from './ServiceCard.types';
import styles from './ServiceCard.module.scss';

export default function ServiceCard({
  name,
  slug,
  image,
  tags,
  label,
  imagePriority = false,
  size = 'small',
  className = '',
}: ServiceCardTypes) {
  return (
    <div
      className={`${styles['ServiceCard']} ${className}`}
      data-size={size}
      data-highlighted={!!label}
    >
      <Link
        href={slug}
        className={styles.link}
        aria-label={`Przejdź do podstrony usługi ${name}`}
      />
      <div className={styles.img}>
        <Img
          data={image}
          sizes={
            size === 'large'
              ? '(min-width: 1300px) 314px, (min-width: 768px) 296px, (min-width: 436px) 400px, 100vw'
              : '71px'
          }
          priority={imagePriority}
        />
        {label && (
          <span className='text-m light'>
            <HighlightedIcon />
            {label}
          </span>
        )}
      </div>
      <div className={styles.content}>
        <span className='text-m light'>{tags.join(' · ')}</span>
        <p>{name}</p>
      </div>
    </div>
  );
}
