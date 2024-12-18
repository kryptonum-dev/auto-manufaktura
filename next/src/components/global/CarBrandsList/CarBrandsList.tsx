import Link from 'next/link';
import FullCtaBox from '@/components/ui/FullCtaBox';
import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import type { CarBrandsListTypes } from './CarBrandsList.types';
import styles from './CarBrandsList.module.scss';

export default function CarBrandsList({ index, heading, fullCtaBox, carBrands }: CarBrandsListTypes) {
  return (
    <section className={`${styles['CarBrandsList']} max-width`}>
      <header>
        <TextBlock
          tag={index === 0 ? 'h1' : 'h2'}
          className='heading-xl'
          value={heading}
        />
      </header>
      <ul>
        {carBrands.map(({ name, slug, image, logo }, i) => (
          <li
            key={name}
            className={styles.card}
          >
            <Link
              href={slug}
              aria-label={`Przejdź do podstrony marki samochodu ${name}`}
              className={styles.link}
            />
            <div className={styles.bg}>
              <Img
                data={image}
                sizes='(min-width: 1400px) 314px, (min-width: 795px) 309px, (min-width: 422px) 38.8vw, (min-width: 360px) 164px, 144px'
                priority={index === 0 && i === 0}
              />
            </div>
            <div className={styles.content}>
              <span className={styles.logo}>
                <Img
                  data={logo}
                  sizes='32px'
                />
              </span>
              <p>
                <span>Serwis {name}</span>
                <ArrowRight />
              </p>
            </div>
          </li>
        ))}
      </ul>
      <FullCtaBox {...fullCtaBox} />
    </section>
  );
}

const ArrowRight = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={12}
    height={13}
    viewBox='0 0 12 13'
    fill='none'
    {...props}
  >
    <path
      stroke='#FBFDFF'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M2 6.833h8m0 0-3-3m3 3-3 3'
    />
  </svg>
);
