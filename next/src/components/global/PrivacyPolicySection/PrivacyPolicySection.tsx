import type { PrivacyPolicySectionTypes } from './PrivacyPolicySection.types';
import TextBlock from '@/components/ui/TextBlock';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import styles from './PrivacyPolicySection.module.scss';

export default function PrivacyPolicySection({
  heading,
  paragraph,
  list,
  breadcrumbs = [],
}: PrivacyPolicySectionTypes) {
  return (
    <section className={styles['PrivacyPolicySection']}>
      <Breadcrumbs data={breadcrumbs} />
      <div className={styles.content}>
        <header>
          <TextBlock
            tag='h1'
            value={heading}
            className='heading-2xl'
          />
          {paragraph && (
            <TextBlock
              tag='p'
              value={paragraph}
            />
          )}
        </header>
        {list.map(({ heading, text }, i) => (
          <div
            key={`privacy-policy-${i}`}
            className={styles.section}
          >
            <header>
              <span className={styles.num}>{i + 1}</span>
              <TextBlock
                tag='h2'
                value={heading}
                className='text-xl light'
              />
            </header>
            <div className={styles.text}>
              <TextBlock
                value={text}
                bulletListClassName='list-check-gear'
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
