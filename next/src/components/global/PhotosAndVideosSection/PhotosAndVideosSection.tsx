import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TextBlock from '@/components/ui/TextBlock';
import Button from '@/components/ui/Button';
import Img from '@/components/ui/Img';
import type { PhotosAndVideosSectionTypes } from './PhotosAndVideosSection.types';
import styles from './PhotosAndVideosSection.module.scss';

export default function PhotosAndVideosSection({ index, breadcrumbs, sections }: PhotosAndVideosSectionTypes) {
  return (
    <section
      className={`${styles['PhotosAndVideosSection']} max-width`}
      data-first={index === 0}
    >
      {breadcrumbs && (
        <Breadcrumbs
          data={breadcrumbs}
          className={styles.breadcrumbs}
        />
      )}
      <div className={styles.sections}>
        {sections.map(({ heading, paragraph, media, cta }, i) => (
          <div
            key={i}
            className={styles.section}
          >
            <header>
              <TextBlock
                tag={index === 0 && i === 0 ? 'h1' : 'h2'}
                value={heading}
                className='heading-xl'
              />
              {paragraph && (
                <div className={styles.text}>
                  <TextBlock
                    value={paragraph}
                    bulletListClassName='list-check-round'
                    linkClassName='link'
                  />
                </div>
              )}
              {cta && (
                <Button
                  {...cta}
                  className={styles.button}
                />
              )}
            </header>
            <div className={styles.list}>
              {media.map(({ title, subtitle, image }, i) => (
                <div key={`item-${i}`}>
                  <div className={styles.media}>
                    <Img
                      data={image}
                      sizes='(min-width: 824px) 204px, (min-width: 663px) 24.74vw, 164px'
                    />
                  </div>
                  <span className='text-m'>{title}</span>
                  {subtitle && <span className='text-m light'>{subtitle}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
