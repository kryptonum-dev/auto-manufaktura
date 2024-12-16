import TextBlock from '@/components/ui/TextBlock';
import Button from '@/components/ui/Button';
import Img from '@/components/ui/Img';
import List from './_List';
import type { FeaturesSectionTypes } from './FeaturesSection.types';
import styles from './FeaturesSection.module.scss';

export default function FeaturesSection({ index, heading, ctaBox, features }: FeaturesSectionTypes) {
  const _features = features.map(({ text }, i) => (
    <TextBlock
      key={`feature-${i}`}
      value={text}
      tag='span'
    />
  ));
  return (
    <section className={`${styles['FeaturesSection']} max-width`}>
      <header>
        <TextBlock
          tag={index === 0 ? 'h1' : 'h2'}
          value={heading}
          className='heading-xl'
        />
      </header>
      <div className={styles.content}>
        <List
          elements={_features}
          Icon={<CheckIcon />}
        />
        <div className={styles.cta}>
          <div className={styles.intro}>
            <TextBlock value={ctaBox.text} />
            <Img
              data={ctaBox.image}
              sizes='84px'
            />
          </div>
          <Button {...ctaBox.cta} />
        </div>
      </div>
    </section>
  );
}

const CheckIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={21}
    viewBox='0 0 20 21'
    fill='none'
    {...props}
  >
    <path
      fill='#2F64F0'
      d='M7.993 3.166c-.203.173-.304.26-.413.332a2.26 2.26 0 0 1-.82.34c-.129.026-.261.036-.527.057-.668.054-1.002.08-1.28.179a2.26 2.26 0 0 0-1.38 1.378c-.098.279-.124.613-.178 1.28a4.772 4.772 0 0 1-.057.527 2.26 2.26 0 0 1-.34.821c-.072.109-.159.21-.332.413-.434.51-.652.765-.779 1.031a2.26 2.26 0 0 0 0 1.95c.127.267.345.522.78 1.032.172.203.259.304.331.412.167.249.282.528.34.821.026.128.036.261.057.527.054.668.08 1.002.179 1.28a2.26 2.26 0 0 0 1.378 1.379c.279.098.613.125 1.28.178.267.021.4.032.527.057.294.058.573.174.821.34.109.073.21.16.413.332.51.435.765.652 1.031.78a2.26 2.26 0 0 0 1.95 0c.267-.128.522-.345 1.032-.78.203-.172.304-.259.412-.332a2.26 2.26 0 0 1 .821-.34c.128-.025.261-.035.527-.057.668-.053 1.002-.08 1.28-.178a2.26 2.26 0 0 0 1.379-1.379c.098-.278.125-.612.178-1.28.021-.266.032-.399.057-.527a2.26 2.26 0 0 1 .34-.82c.073-.109.16-.21.332-.413.435-.51.652-.765.78-1.032a2.26 2.26 0 0 0 0-1.95c-.128-.266-.345-.521-.78-1.031-.172-.203-.259-.304-.332-.413a2.26 2.26 0 0 1-.34-.82c-.025-.129-.035-.261-.057-.527-.053-.668-.08-1.002-.178-1.28a2.26 2.26 0 0 0-1.379-1.38c-.278-.098-.612-.124-1.28-.178a4.773 4.773 0 0 1-.527-.057 2.26 2.26 0 0 1-.82-.34 4.762 4.762 0 0 1-.413-.332c-.51-.434-.765-.652-1.032-.779a2.26 2.26 0 0 0-1.95 0c-.266.127-.521.345-1.031.78Z'
    />
    <path
      fill='#FBFDFF'
      d='M13.644 8.718a.678.678 0 0 0-.96-.959l-4.041 4.042-1.329-1.329a.678.678 0 1 0-.96.96l1.81 1.808a.678.678 0 0 0 .959 0l4.521-4.522Z'
    />
  </svg>
);
