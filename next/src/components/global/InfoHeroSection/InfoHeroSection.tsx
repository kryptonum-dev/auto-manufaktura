import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import type { InfoHeroSectionTypes } from './InfoHeroSection.types';
import styles from './InfoHeroSection.module.scss';

export default function InfoHeroSection({
  index,
  breadcrumbs,
  heading,
  content,
  image,
  logo,
  cta,
}: InfoHeroSectionTypes) {
  return (
    <section className={`${styles['InfoHeroSection']} max-width`}>
      <div className={styles.content}>
        {breadcrumbs && <Breadcrumbs data={breadcrumbs} />}
        <header>
          {logo && (
            <Img
              data={logo}
              sizes='56px'
            />
          )}
          <TextBlock
            value={heading}
            tag={index === 0 ? 'h1' : 'h2'}
            className='heading-2xl'
          />
        </header>
        <div className={styles.text}>
          <TextBlock
            value={content}
            linkClassName='link'
          />
        </div>
        <Button {...cta} />
      </div>
      <Img
        data={image}
        sizes='(min-width: 768px) 643px, (min-width: 320px) 94vw, 296px'
        priority={index === 0}
      />
    </section>
  );
}
