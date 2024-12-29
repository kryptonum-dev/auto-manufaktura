import TextBlock from '@/components/ui/TextBlock';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Img from '@/components/ui/Img';
import { VideoLazy } from '@/components/ui/Video';
import type { MediaWithCenteredContentSectionTypes } from './MediaWithCenteredContentSection.types';
import styles from './MediaWithCenteredContentSection.module.scss';

export default function MediaWithCenteredContentSection({
  index,
  breadcrumbs,
  heading,
  text,
  cta,
  media: { type, image, video },
}: MediaWithCenteredContentSectionTypes) {
  return (
    <section
      className={styles['MediaWithCenteredContentSection']}
      data-first={index === 0}
    >
      <div
        className={styles.media}
        data-type={type}
      >
        {type === 'image' && (
          <Img
            data={image}
            sizes='(min-width: 1600px) 1600px, 100vw'
            priority={index === 0}
          />
        )}
        {type === 'video' && (
          <VideoLazy
            {...video}
            className={styles.video}
          />
        )}
      </div>
      <header className='max-width'>
        {breadcrumbs && (
          <Breadcrumbs
            className={styles.breadcrumbs}
            data={breadcrumbs}
          />
        )}
        <TextBlock
          value={heading}
          tag={index === 0 ? 'h1' : 'h2'}
          className='heading-xl'
        />
        <div className={styles.text}>
          <TextBlock value={text} />
        </div>
        <Button {...cta} />
      </header>
    </section>
  );
}
