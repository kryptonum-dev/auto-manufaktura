import Link from 'next/link';
import Img from '@/components/ui/Img';
import type { BlogPostCardTypes } from './BlogPostCard.types';
import styles from './BlogPostCard.module.scss';
import { formatDate } from '@/utils/format-date';

export default function BlogPostCard({ name, path, image, date, imagePriority = false }: BlogPostCardTypes) {
  return (
    <article className={styles['BlogPostCard']}>
      <Link
        href={path}
        aria-label={`Przejdź do artykułu: ${name}`}
        className={styles.link}
      />
      <div className={styles.bg}>
        <Img
          data={image}
          priority={imagePriority}
          sizes=''
        />
      </div>
      <div className={styles.content}>
        <h2 className='text-l'>{name}</h2>
        <div>
          <p className='text-m light'>
            <span>{formatDate(date)}</span>
            <span>3 minuty czytania</span>
          </p>
          <span className={styles.icon}>
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </article>
  );
}

const ArrowRightIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    viewBox='0 0 20 20'
    fill='none'
    {...props}
  >
    <path
      stroke='#FBFDFF'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.332 10h13.333m0 0-5-5m5 5-5 5'
    />
  </svg>
);
