'use client';
import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import type { InternshipOfferTypes } from './InternshipOffer.types';
import styles from './InternshipOffer.module.scss';

export default function InternshipOffer({ image, heading, paragraph, apply }: InternshipOfferTypes) {
  return (
    <div className={styles['InternshipOffer']}>
      <Img
        data={image}
        sizes='(min-width: 1040px) 405px, (min-width: 360px) 86vw, 256px'
      />
      <header>
        <TextBlock
          tag='h2'
          value={heading}
        />
        {paragraph && <TextBlock value={paragraph} />}
        <Button
          text='Aplikuj'
          aria-label='Aplikuj na praktyki'
          onClick={() => apply('Praktykant')}
        />
      </header>
    </div>
  );
}
