import Link from 'next/link';
import DropdownList from './_DropdownList';
import type { PaginationTypes } from './Pagination.types';
import styles from './Pagination.module.scss';

export default function Pagination({ totalPages, currentPage, basePath }: PaginationTypes) {
  const renderPageLink = (page: number) => (
    <Link
      href={page === 1 ? basePath : `${basePath}/strona/${page}`}
      key={`page-${page}`}
      aria-current={page === currentPage ? 'page' : undefined}
      scroll={false}
      className='text-m light'
    >
      {page}
    </Link>
  );

  return (
    <nav
      className={styles['Pagination']}
      arial-label='Paginacja postów na blogu'
    >
      {totalPages <= 6 ? (
        <>{Array.from({ length: totalPages }).map((_, i) => renderPageLink(i + 1))}</>
      ) : (
        <>
          {Array.from({ length: 4 }).map((_, i) => renderPageLink(i + 1))}
          <DropdownList links={Array.from({ length: totalPages - 5 }).map((_, i) => renderPageLink(i + 5))} />
          {renderPageLink(totalPages)}
        </>
      )}
    </nav>
  );
}
