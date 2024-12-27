import Img from '@/components/ui/Img';
import TextBlock from '@/components/ui/TextBlock';
import Button from '@/components/ui/Button';
import Light from '@/components/ui/Light';
import { VideoLazy } from '@/components/ui/Video';
import type { LogoSectionTypes } from './LogoSection.types';
import styles from './LogoSection.module.scss';

export default function LogoSection({
  index,
  heading,
  text,
  cta,
  media: { type, image, video },
  list,
}: LogoSectionTypes) {
  return (
    <section className={styles['LogoSection']}>
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
      <div className={styles.content}>
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
          {list.map((item, i) => (
            <Img
              data={item}
              key={i}
              sizes='143px'
              priority={index === 0 && i === 0}
            />
          ))}
        </div>
        <Button
          {...cta}
          className={styles.button}
        />
      </div>
    </section>
  );
}
