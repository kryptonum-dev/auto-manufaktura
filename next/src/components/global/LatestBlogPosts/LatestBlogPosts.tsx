import Button from '@/components/ui/Button';
import TextBlock from '@/components/ui/TextBlock';
import BlogPostCard from '@/components/ui/BlogPostCard';
import type { LatestBlogPostsTypes } from './LatestBlogPosts.types';
import styles from './LatestBlogPosts.module.scss';

export default function LatestBlogPosts({ index, heading, paragraph, cta, posts = [] }: LatestBlogPostsTypes) {
  return (
    <section className={`${styles['LatestBlogPosts']} max-width`}>
      <header>
        <div>
          <TextBlock
            tag={index === 0 ? 'h1' : 'h2'}
            value={heading}
            className='heading-xl'
          />
          {paragraph && <TextBlock value={paragraph} />}
        </div>
        <Button {...cta} />
      </header>
      {posts.length > 0 && (
        <div className={styles.posts}>
          {posts.map((post, i) => (
            <BlogPostCard
              key={`blogPostCard-${i}`}
              {...post}
              imagePriority={index === 0 && i === 0}
              HeadingTag={index === 0 ? 'h2' : 'h3'}
            />
          ))}
        </div>
      )}
    </section>
  );
}
