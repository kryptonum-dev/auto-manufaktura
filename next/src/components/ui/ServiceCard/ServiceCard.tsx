import Link from 'next/link';
import Img from '@/components/ui/Img';
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

const HighlightedIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={17}
    viewBox='0 0 16 17'
    fill='none'
    {...props}
  >
    <path
      fill='#2F64F0'
      fillRule='evenodd'
      d='m14.559 8.043-.153 1.623c-.252 2.675-.378 4.013-1.166 4.82-.789.806-1.97.806-4.334.806H7.093c-2.363 0-3.545 0-4.333-.807-.789-.806-.915-2.144-1.166-4.819L1.44 8.043c-.12-1.275-.18-1.913.038-2.176a.662.662 0 0 1 .45-.245c.317-.028.715.425 1.512 1.332.412.469.618.703.848.74.127.02.257 0 .374-.06.212-.107.354-.397.637-.976L6.79 3.602C7.326 2.506 7.593 1.959 8 1.959c.406 0 .674.547 1.208 1.643L10.7 6.658c.283.58.424.87.636.976.118.06.247.08.375.06.23-.037.435-.271.847-.74.797-.907 1.195-1.36 1.512-1.332a.661.661 0 0 1 .45.245c.219.263.159.9.039 2.176ZM8.634 9.09l-.066-.117c-.253-.455-.38-.682-.57-.682-.189 0-.315.227-.569.682l-.065.117c-.072.13-.108.194-.164.237-.056.042-.126.058-.266.09l-.127.028c-.492.112-.738.167-.797.355-.058.189.11.385.445.777l.086.101c.096.112.143.168.165.236.021.07.014.144 0 .292l-.013.136c-.051.523-.077.785.077.901.153.116.383.01.844-.202l.119-.055c.13-.06.196-.09.266-.09s.134.03.265.09l.12.055c.46.212.69.318.844.202.153-.116.128-.378.077-.901l-.013-.136c-.015-.148-.022-.223 0-.292.02-.068.069-.124.164-.236l.087-.101c.335-.392.503-.588.444-.777-.058-.188-.304-.243-.796-.355l-.127-.028c-.14-.032-.21-.048-.266-.09-.056-.043-.092-.108-.164-.237Z'
      clipRule='evenodd'
    />
  </svg>
);
