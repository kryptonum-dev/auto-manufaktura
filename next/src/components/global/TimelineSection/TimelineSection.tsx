import Light from '@/components/ui/Light';
import Img from '@/components/ui/Img';
import TextBlock from '@/components/ui/TextBlock';
import Timeline from './Timeline';
import { VideoLazy } from '@/components/ui/Video';
import type { TimelineSectionTypes } from './TimelineSection.types';
import styles from './TimelineSection.module.scss';

export default function TimelineSection({
  index,
  heading,
  headerImage,
  text,
  media: { type, image, video },
  timeline,
}: TimelineSectionTypes) {
  const _timeline = timeline.map(({ label, text }) => ({
    label,
    text: (
      <TextBlock
        value={text}
        tag='span'
      />
    ),
  }));

  return (
    <section className={styles['TimelineSection']}>
      <Light
        className={styles.lightBlue}
        size='medium'
      />
      <Light
        className={styles.lightOrange}
        color='orange'
        size='medium'
      />
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
      <div className={`${styles.content} max-width`}>
        <header>
          <Img
            data={headerImage}
            sizes=''
            priority={index === 0}
          />
          <div>
            <TextBlock
              tag={index === 0 ? 'h1' : 'h2'}
              value={heading}
              className='heading-2xl'
            />
            {text && (
              <div className={styles.text}>
                <TextBlock value={text} />
              </div>
            )}
          </div>
        </header>
        <Timeline elements={_timeline} />
      </div>
    </section>
  );
}
