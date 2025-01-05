import Link from 'next/link';
import { PortableText, toPlainText, type PortableTextReactComponents } from 'next-sanity';
import { slugify } from '@/utils/slugify';
import { formatDate } from '@/utils/format-date';
import ReadingTime from '@/components/ui/ReadingTime';
import Img from '@/components/ui/Img';
import PostImage, { type ImageTypes } from './Image';
import ListWithImages, { type ListWithImagesTypes } from './ListWithImages';
import Quote, { type QuoteTypes } from './Quote';
import type { ContentTypes } from './Content.types';
import styles from './Content.module.scss';

const components = {
  block: {
    h2: ({ value, children }) => (
      <h2
        id={slugify(toPlainText(value))}
        className='heading-xl'
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className='text-l'>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => {
      const Element = value.linkType === 'external' ? 'a' : Link;
      return (
        <Element
          href={value.href}
          className='link'
          {...(value.linkType === 'external' &&
            !/^(tel:|mailto:)/.test(value.href) && { target: '_blank', rel: 'noopener' })}
        >
          {children}
        </Element>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className='list-check-round'>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    Image: ({ value }: { value: ImageTypes }) => <PostImage {...value} />,
    ListWithImages: ({ value }: { value: ListWithImagesTypes }) => <ListWithImages {...value} />,
    Quote: ({ value }: { value: QuoteTypes }) => <Quote {...value} />,
  },
} as Partial<PortableTextReactComponents>;

export default function Content({ image, author, date, content, readingTimeContent }: ContentTypes) {
  return (
    <div className={styles['Content']}>
      <div className={styles.intro}>
        <div>
          <p className='text-m light'>
            <span>{formatDate(date)}</span>
            <ReadingTime content={readingTimeContent} />
          </p>
          {author && (
            <div className={styles.author}>
              {author.image && (
                <Img
                  data={author.image}
                  sizes='40px'
                />
              )}
              <p className='text-m light'>
                <span>{author.name}</span>
                {author.text && <span>{author.text}</span>}
              </p>
            </div>
          )}
        </div>
        <Img
          data={image}
          sizes='(min-width: 810px) 643px, (min-width: 768px) 79.1vw, (min-width: 320px) 94vw, 296px'
          priority={true}
        />
      </div>
      <div className={styles.components}>
        <PortableText
          value={content}
          components={components}
        />
      </div>
    </div>
  );
}
