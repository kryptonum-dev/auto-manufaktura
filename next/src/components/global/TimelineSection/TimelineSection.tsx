import Img from '@/components/ui/Img';
import TextBlock from '@/components/ui/TextBlock';
import Timeline from './_Timeline';
import Light from '@/components/ui/Light';
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
      <Img
        className={styles.imgLightBlue}
        src='/logo-blue-light.png'
        width={548}
        height={1320}
        sizes='300px'
        alt='blue light'
      />
      <Img
        className={styles.imgLightOrange}
        src='/logo-orange-light.png'
        width={548}
        height={1320}
        sizes='300px'
        alt='orange light'
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
            rootMargin='90%'
          />
        )}
      </div>
      <div className={`${styles.content} max-width`}>
        <header>
          <Img
            data={headerImage}
            sizes='(min-width: 768px) 272px, (min-width: 705px) 35.42vw, 250px'
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
