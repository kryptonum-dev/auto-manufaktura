import Img from '@/components/ui/Img';
import TextBlock from '@/components/ui/TextBlock';
import Button from '@/components/ui/Button';
import Video from '@/components/ui/Video';
import type { LocationsSectionTypes } from './LocationsSection.types';
import styles from './LocationsSection.module.scss';

export default function LocationsSection({
  index,
  heading,
  text,
  media: { type, image, video },
  locations,
}: LocationsSectionTypes) {
  return (
    <section className={styles['LocationsSection']}>
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
            className={styles.video}
            {...video}
            rootMargin='150%'
          />
        )}
      </div>
      <header>
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
      </header>
      <div className={styles.list}>
        {locations.map(({ name, path }, i) => (
          <Button
            key={i}
            href={path}
            text={name}
            theme='tetriary'
          />
        ))}
      </div>
    </section>
  );
}
