import TransitionLink from '@/components/ui/TransitionLink';
import Img from '@/components/ui/Img';
import ReadingTime from '@/components/ui/ReadingTime';
import type { BlogPostCardTypes } from './BlogPostCard.types';
import styles from './BlogPostCard.module.scss';
import { formatDate } from '@/utils/format-date';

export default function BlogPostCard({
  name,
  path,
  image,
  date,
  HeadingTag = 'h2',
  readingTimeContent,
  imagePriority = false,
}: BlogPostCardTypes) {
  return (
    <article className={styles['BlogPostCard']}>
      <TransitionLink
        href={path}
        aria-label={`Przejdź do artykułu: ${name}`}
        className={styles.link}
      />
      <Img
        className={styles.bg}
        data={image}
        priority={imagePriority}
        sizes='(min-width: 961px) 314px, (min-width: 768px) 80vw, (min-width: 480px) 450px, (min-width: 320px) 93vw, 295px'
      />
      <div className={styles.content}>
        <HeadingTag className='text-l'>{name}</HeadingTag>
        <div>
          <p className='text-m light'>
            <span>{formatDate(date)}</span>
            <ReadingTime content={readingTimeContent} />
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
