import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import FullCtaBox from '@/components/ui/FullCtaBox';
import Video from '@/components/ui/Video';
import type { FourStepsSectionTypes } from './FourStepsSection.types';
import styles from './FourStepsSection.module.scss';

export default function FourStepsSection({
  index,
  heading,
  fullCtaBox,
  media: { type, image, video },
  steps,
}: FourStepsSectionTypes) {
  return (
    <section className={styles['FourStepsSection']}>
      <div className={styles.content}>
        <header className='max-width'>
          <TextBlock
            tag={index === 0 ? 'h1' : 'h2'}
            value={heading}
            className='heading-xl'
          />
        </header>
        <div className={styles.steps}>
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
                rootMargin='150%'
              />
            )}
          </div>
          <div className={`${styles.list} max-width`}>
            {steps.map((step, i) => (
              <div key={i}>
                <span className={`${styles.num} text-m light`}>0{i + 1}</span>
                <p>
                  <TextBlock
                    tag='span'
                    value={step.text}
                  />
                </p>
                {step.cta && (
                  <Button
                    {...step.cta}
                    className={styles.button}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`${styles.fullCtaBox} max-width`}>
        <FullCtaBox {...fullCtaBox} />
      </div>
    </section>
  );
}
