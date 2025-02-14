import { forwardRef } from 'react';
import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import Form from './_Form';
import { MessageIcon } from '@/components/icons';
import type { ApplicationFormTypes } from './ApplicationForm.types';
import styles from './ApplicationForm.module.scss';

export default forwardRef<HTMLDivElement, ApplicationFormTypes>(function ApplicationForm(
  { heading, subheading, paragraph, images, formStates, ...props },
  ref
) {
  const formStateContent = {
    success: {
      Heading: (
        <TextBlock
          className='text-xl'
          value={formStates.success.heading}
        />
      ),
      Paragraph: <TextBlock value={formStates.success.paragraph} />,
      ctaText: formStates.success.ctaText || undefined,
    },
    error: {
      Heading: (
        <TextBlock
          className='text-xl'
          value={formStates.error.heading}
        />
      ),
      Paragraph: <TextBlock value={formStates.error.paragraph} />,
      ctaText: formStates.error.ctaText || undefined,
    },
  };

  return (
    <div className={styles['ApplicationForm']}>
      <div className={styles.content}>
        <div className={styles.images}>
          {images.map((img, i) => (
            <div key={`img-${i}`}>
              <Img
                data={img}
                sizes='84px'
              />
            </div>
          ))}
        </div>
        <header>
          <TextBlock
            value={heading}
            tag='h2'
            className='heading-xs'
          />
          {subheading && (
            <div className={styles.subheading}>
              <MessageIcon />
              <TextBlock value={subheading} />
            </div>
          )}
        </header>
        <div className={styles.text}>
          <TextBlock
            value={paragraph}
            bulletListClassName='list-check-round'
          />
        </div>
      </div>
      <div
        ref={ref}
        className={styles.wrapper}
      >
        <Form
          {...props}
          formStates={formStateContent}
        />
      </div>
    </div>
  );
});
