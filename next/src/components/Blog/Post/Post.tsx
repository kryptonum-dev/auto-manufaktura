import { toPlainText } from 'next-sanity';
import { slugify } from '@/utils/slugify';
import TextBlock from '@/components/ui/TextBlock';
import Content from './Content';
import ScrollNavigation from '@/components/ui/ScrollNavigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { PostTypes } from './Post.types';
import styles from './Post.module.scss';

export default function Post({ breadcrumbs, heading, paragraph, postHeadings = [], content }: PostTypes) {
  const _postHeadings = postHeadings.map(heading => ({
    slug: slugify(toPlainText(heading)),
    text: toPlainText(heading),
  }));

  return (
    <section className={`${styles['Post']} max-width`}>
      <Breadcrumbs
        data={breadcrumbs}
        className={styles.breadcrumbs}
      />
      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <header>
            <TextBlock
              tag='h1'
              value={heading}
              className='heading-xl'
            />
            {paragraph && <TextBlock value={paragraph} />}
          </header>
          {_postHeadings.length > 0 && (
            <ScrollNavigation
              headings={_postHeadings}
              initialActiveSection={_postHeadings[0].slug}
              navAriaLabel='Nawigacja do sekcji artykułu'
              sectionSelector={`.${styles.content} h2`}
              threshold={1}
              className={styles.navigation}
            />
          )}
        </div>
        <div className={styles.content}>
          <Content {...content} />
        </div>
      </div>
    </section>
  );
}
