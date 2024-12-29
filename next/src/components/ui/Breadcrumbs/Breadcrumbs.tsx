import TransitionLink from '@/components/ui/TransitionLink';
import { Fragment } from 'react';
import type { BreadcrumbsDataTypes } from './Breadcrumbs.types';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs({
  data = [],
  className = '',
}: {
  data?: BreadcrumbsDataTypes;
  className?: string;
}) {
  const breadcrumbsData = [{ name: 'Strona główna', path: '/' }, ...data];

  return (
    <>
      {breadcrumbsData.length > 1 && (
        <nav
          aria-label='Breadcrumbs'
          className={`${styles['Breadcrumbs']} ${className}`}
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
                <TransitionLink
                  className='text-m light'
                  href={path}
                >
                  {name}
                </TransitionLink>
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
