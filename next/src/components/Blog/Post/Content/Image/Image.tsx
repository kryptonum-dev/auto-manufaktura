import Img from '@/components/ui/Img';
import type { ImageTypes } from './Image.types';
import styles from './Image.module.scss';

export default function Image({ image, text }: ImageTypes) {
  return (
    <figure className={styles['Image']}>
      <Img
        data={image}
        sizes='(min-width: 810px) 643px, (min-width: 768px) 79.1vw, (min-width: 320px) 94vw, 296px'
      />
      {text && <figcaption className='text-m light'>{text}</figcaption>}
    </figure>
  );
}
