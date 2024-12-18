import Img from '@/components/ui/Img';
import TextBlock from '@/components/ui/TextBlock';
import type { ListWithImagesTypes } from './ListWithImages.types';
import styles from './ListWithImages.module.scss';

export default function ListWithImages({ list }: ListWithImagesTypes) {
  return (
    <div className={styles['ListWithImages']}>
      {list.map(({ image, heading, paragraph }, i) => (
        <div key={`listWithImages-${i}`}>
          <Img
            data={image}
            sizes='(min-width: 768px) 109px, (min-width: 549px) 14.2vw, 78px'
          />
          <div>
            <TextBlock
              tag='h3'
              value={heading}
              className='text-l'
            />
            {paragraph && <TextBlock value={paragraph} />}
          </div>
        </div>
      ))}
    </div>
  );
}
