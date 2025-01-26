import Img from '@/components/ui/Img';
import TextBlock from '@/components/ui/TextBlock';
import Timeline from './_Timeline';
import Light from '@/components/ui/Light';
import Video from '@/components/ui/Video';
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
          <Video
            {...video}
            className={styles.video}
            rootMargin='190%'
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
        <Timeline>
          <ul className={styles.list}>
            {timeline.map(({ label, text }, i) => (
              <li key={i}>
                <div>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.icon} />
                </div>
                <TextBlock value={text} />
              </li>
            ))}
          </ul>
        </Timeline>
      </div>
    </section>
  );
}
