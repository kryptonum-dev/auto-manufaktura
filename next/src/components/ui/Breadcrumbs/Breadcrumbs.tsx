import { Fragment } from 'react';
import Link from 'next/link';
import { DOMAIN } from '@/global/constants';
import type { BreadcrumbsTypes } from './Breadcrumbs.types';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs({ visible = true, data = [] }: BreadcrumbsTypes) {
  const breadcrumbsData = [{ name: 'Strong główna', path: '/' }, ...data];

  const breadcrumbsSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      data?.map(({ name, path }, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: name,
        item: `${DOMAIN}${path}`,
      })),
    ],
  });

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: breadcrumbsSchema,
        }}
      />
      {visible && breadcrumbsData.length > 1 && (
        <nav
          aria-label='Breadcrumbs'
          className={styles['Breadcrumbs']}
        >
          {breadcrumbsData.map(({ name, path }, i) => {
            const isLast = i === breadcrumbsData.length - 1;
            return isLast ? (
              <span
                className='text-m'
                key={i}
              >
                {name}
              </span>
            ) : (
              <Fragment key={i}>
                <Link
                  className='text-m light'
                  href={path}
                >
                  {name}
                </Link>
                <ChevronIcon />
              </Fragment>
            );
          })}
        </nav>
      )}
    </>
  );
}

const ChevronIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='none'
    {...props}
  >
    <path
      stroke='#CBD0D0'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6 3.333 10 8l-4 4.667'
    />
  </svg>
);
