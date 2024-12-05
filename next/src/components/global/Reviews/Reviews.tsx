import TextBlock from '@/components/ui/TextBlock';
import ReviewsList from './_ReviewsList';
import RatingBadge from '@/components/ui/RatingBadge';
import type { ReviewsTypes } from './Reviews.types';
import styles from './Reviews.module.scss';

export default function Reviews({ index, heading, workshops, reviews }: ReviewsTypes) {
  const hasTwoWorkshops = workshops.length === 2;

  return (
    <section className={`${styles['Reviews']} max-width`}>
      <header>
        <GoogleIcon className={!hasTwoWorkshops ? styles.visible : ''} />
        <TextBlock
          tag={index === 0 ? 'h1' : 'h2'}
          value={heading}
          className='text-m light'
        />
      </header>
      {workshops?.length > 0 && (
        <div className={`${styles.ratings} ${hasTwoWorkshops ? styles.withIcon : ''}`}>
          {hasTwoWorkshops && <GoogleIcon />}
          {workshops.map(({ googleData, city, street }, i) => (
            <RatingBadge
              key={i}
              {...googleData}
              className={styles.rating}
              prefix={`${street.replace(/^(Ul\.|ul\.)\s*/, '').trim()}, ${city}`}
            />
          ))}
        </div>
      )}
      <ReviewsList
        index={index}
        reviews={reviews}
        icon={<ArrowDownIcon />}
      />
    </section>
  );
}

const ArrowDownIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={13}
    height={12}
    viewBox='0 0 13 12'
    fill='none'
    {...props}
  >
    <path
      stroke='#CBD0D0'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6.5 2v8m0 0 3-3m-3 3-3-3'
    />
  </svg>
);

const GoogleIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    aria-label='Logo Google'
    {...props}
  >
    <path
      fill='#fff'
      d='M8.361.79a11.865 11.865 0 0 0 .812 22.669c1.987.512 4.07.535 6.067.065A10.712 10.712 0 0 0 20.097 21a10.77 10.77 0 0 0 3-4.923c.58-2.048.683-4.202.301-6.296h-11.16v4.629h6.464a5.573 5.573 0 0 1-2.374 3.66 6.779 6.779 0 0 1-2.612 1.031 7.743 7.743 0 0 1-2.831 0 6.969 6.969 0 0 1-2.635-1.15 7.369 7.369 0 0 1-2.718-3.64 7.183 7.183 0 0 1 0-4.619 7.36 7.36 0 0 1 1.72-2.795 6.97 6.97 0 0 1 7.023-1.834 6.428 6.428 0 0 1 2.557 1.5c.729-.725 1.456-1.452 2.183-2.18.375-.392.784-.766 1.153-1.167A11.478 11.478 0 0 0 16.35.861 12 12 0 0 0 8.361.79Z'
    />
    <path
      fill='#E33629'
      d='M8.36.789a12 12 0 0 1 7.99.07 11.479 11.479 0 0 1 3.816 2.365c-.375.402-.77.777-1.153 1.167-.728.726-1.455 1.45-2.181 2.171a6.428 6.428 0 0 0-2.558-1.5 6.97 6.97 0 0 0-7.023 1.826 7.36 7.36 0 0 0-1.722 2.796l-3.886-3.01A11.912 11.912 0 0 1 8.36.79Z'
    />
    <path
      fill='#F8BD00'
      d='M.611 9.657a11.8 11.8 0 0 1 1.032-2.981L5.53 9.693a7.183 7.183 0 0 0 0 4.618c-1.295 1-2.591 2.005-3.887 3.015A11.874 11.874 0 0 1 .61 9.657Z'
    />
    <path
      fill='#587DBD'
      d='M12.237 9.777h11.16a13.938 13.938 0 0 1-.302 6.297 10.77 10.77 0 0 1-3 4.923c-1.254-.978-2.514-1.95-3.768-2.928a5.573 5.573 0 0 0 2.373-3.664h-6.463c-.002-1.541 0-3.085 0-4.628Z'
    />
    <path
      fill='#319F43'
      d='M1.64 17.326c1.297-1 2.592-2.006 3.887-3.016a7.369 7.369 0 0 0 2.723 3.642c.791.56 1.69.947 2.64 1.14a7.744 7.744 0 0 0 2.831 0 6.779 6.779 0 0 0 2.612-1.031c1.255.978 2.515 1.95 3.769 2.928a10.712 10.712 0 0 1-4.856 2.526c-1.998.47-4.08.447-6.068-.066a11.813 11.813 0 0 1-4.312-2.173 11.95 11.95 0 0 1-3.225-3.95Z'
    />
  </svg>
);
