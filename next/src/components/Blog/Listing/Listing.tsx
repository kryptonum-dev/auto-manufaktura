import Link from 'next/link';
import TextBlock from '@/components/ui/TextBlock';
import Pagination from '@/components/ui/Pagination';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CheckIcon } from '@/components/icons';
import type { ListingTypes } from './Listing.types';
import styles from './Listing.module.scss';

export default function Listing({
  breadcrumbs,
  data,
  totalPosts,
  categories,
  totalPages = 1,
  currentPage = 1,
  currentCategorySlug = '',
}: ListingTypes) {
  return (
    <section className={`${styles['Listing']} max-width`}>
      {breadcrumbs && (
        <Breadcrumbs
          className={styles.breadcrumbs}
          data={breadcrumbs}
        />
      )}
      <header>
        <TextBlock
          tag='h1'
          value={data.listing.heading}
          className='heading-xl'
        />
        <TextBlock value={data.listing.paragraph} />
      </header>
      <div className={styles.categories}>
        <p>Kategorie</p>
        <nav aria-label='Filtruj posty na blogu według kategorii'>
          <Link
            href='/blog'
            className='chip'
            aria-current={currentCategorySlug === '' ? 'page' : undefined}
            scroll={false}
          >
            <div>
              <CheckIcon />
              <p>Wszystkie</p>
              <span>{totalPosts}</span>
            </div>
          </Link>
          {categories.map(({ name, path, postCount }, i) => (
            <Link
              key={`category-${i}`}
              href={path}
              className='chip'
              aria-current={path === currentCategorySlug ? 'page' : undefined}
              scroll={false}
            >
              <div>
                <CheckIcon />
                <p>{name}</p>
                <span>{postCount}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div className={styles.posts}>POSTS</div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          basePath={currentCategorySlug || '/blog'}
        />
      )}
    </section>
  );
}
