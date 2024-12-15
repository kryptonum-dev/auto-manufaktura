import TextBlock from '@/components/ui/TextBlock';
import FullCtaBox from '@/components/ui/FullCtaBox';
import PricesCard from './PricesCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { PricesTypes } from './Prices.types';
import styles from './Prices.module.scss';

export default function Prices({
  index,
  breadcrumbs,
  heading,
  additionalInfo,
  paragraph,
  fullCtaBox,
  section,
}: PricesTypes) {
  return (
    <section className={`${styles['Prices']} max-width`}>
      {breadcrumbs && <Breadcrumbs data={breadcrumbs} />}
      <div className={styles.container}>
        <header className={styles.header}>
          <TextBlock
            value={heading}
            tag={index === 0 ? 'h1' : 'h2'}
            className='heading-2xl'
          />
          {paragraph && (
            <div className={styles.paragraph}>
              <TextBlock
                value={paragraph}
                bulletListClassName='text-m light'
              />
            </div>
          )}
          {additionalInfo && (
            <p className={styles.info}>
              <ClockIcon />
              <TextBlock
                value={additionalInfo}
                tag='span'
              />
            </p>
          )}
        </header>
        <div className={styles.wrapper}>
          {section.map(({ heading, list }, i) => (
            <div
              className={styles.section}
              key={`prices-${i}`}
            >
              <TextBlock
                tag={index === 0 ? 'h2' : 'h3'}
                value={heading}
                className='heading-xl'
              />
              <div className={styles.list}>
                {list.map((item, i) => (
                  <PricesCard
                    key={`prices-card-${i}`}
                    {...item}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
          <FullCtaBox
            {...fullCtaBox}
            className={styles.fullCtaBox}
          />
        </div>
      </div>
    </section>
  );
}

const ClockIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    viewBox='0 0 20 20'
    fill='none'
    {...props}
  >
    <path
      fill='#2F64F0'
      d='M10.001 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z'
    />
    <path
      fill='#FBFDFF'
      fillRule='evenodd'
      d='M10 6.042c.345 0 .625.28.625.625V9.74l1.9 1.9a.625.625 0 1 1-.884.884l-2.083-2.083A.625.625 0 0 1 9.375 10V6.667c0-.346.28-.625.625-.625Z'
      clipRule='evenodd'
    />
  </svg>
);
