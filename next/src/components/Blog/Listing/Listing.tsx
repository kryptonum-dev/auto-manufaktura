import Chip from '@/components/ui/Chip';
import TextBlock from '@/components/ui/TextBlock';
import Pagination from '@/components/ui/Pagination';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BlogPostCard from '@/components/ui/BlogPostCard';
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
  posts,
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
          <Chip
            tag='a'
            href='/blog'
            scroll={false}
            aria-current={currentCategorySlug === '' ? 'page' : undefined}
          >
            <p>Wszystkie</p>
            <span>{totalPosts}</span>
          </Chip>
          {categories.map(({ name, path, postCount }, i) => (
            <Chip
              key={`category-${i}`}
              tag='a'
              href={path}
              aria-current={path === currentCategorySlug ? 'page' : undefined}
              scroll={false}
            >
              <p>{name}</p>
              <span>{postCount}</span>
            </Chip>
          ))}
        </nav>
      </div>
      <div className={styles.posts}>
        {posts.map((post, i) => (
          <BlogPostCard
            key={`post-${i}`}
            {...post}
            imagePriority={i === 0}
          />
        ))}
      </div>
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
