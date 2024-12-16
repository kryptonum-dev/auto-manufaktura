import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';

import type { SimplePhotoAndTextTypes } from './SimplePhotoAndText.types';
import styles from './SimplePhotoAndText.module.scss';

export default function SimplePhotoAndText({
  index,
  heading,
  content,
  image,
  cta,
  imagePosition,
}: SimplePhotoAndTextTypes) {
  return (
    <section
      className={`${styles['SimplePhotoAndText']} max-width`}
      data-position={imagePosition}
    >
      <Img
        data={image}
        sizes=''
        priority={index === 0}
      />
      <div className={styles.content}>
        {heading && (
          <header>
            <TextBlock
              value={heading}
              tag={index === 0 ? 'h1' : 'h2'}
              className='heading-2xl'
            />
          </header>
        )}
        <div className={styles.text}>
          <TextBlock
            value={content}
            bulletListClassName='list-check-gear'
          />
        </div>
        <Button {...cta} />
      </div>
    </section>
  );
}
