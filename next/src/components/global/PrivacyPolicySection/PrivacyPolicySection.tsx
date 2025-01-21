import { PortableText, type PortableTextReactComponents } from 'next-sanity';
import Link from 'next/link';
import type { PrivacyPolicySectionTypes } from './PrivacyPolicySection.types';
import TextBlock from '@/components/ui/TextBlock';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import styles from './PrivacyPolicySection.module.scss';

const components = {
  block: {
    h2: ({ children }) => <h2 className='text-xl light'>{children}</h2>,
    h3: ({ children }) => <h3 className='heading-xs'>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => {
      const Element = value.linkType === 'external' ? 'a' : Link;
      return (
        <Element
          href={value.href}
          className='link'
          {...(value.linkType === 'external' &&
            !/^(tel:|mailto:)/.test(value.href) && { target: '_blank', rel: 'noopener' })}
        >
          {children}
        </Element>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className='list-check-gear'>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
} as Partial<PortableTextReactComponents>;

export default function PrivacyPolicySection({
  heading,
  paragraph,
  content,
  breadcrumbs = [],
}: PrivacyPolicySectionTypes) {
  return (
    <section className={styles['PrivacyPolicySection']}>
      <Breadcrumbs data={breadcrumbs} />
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
      {content && (
        <div className={styles.content}>
          <PortableText
            value={content}
            components={components}
          />
        </div>
      )}
    </section>
  );
}

// import type { PrivacyPolicySectionTypes } from './PrivacyPolicySection.types';
// import TextBlock from '@/components/ui/TextBlock';
// import Breadcrumbs from '@/components/ui/Breadcrumbs';
// import styles from './PrivacyPolicySection.module.scss';

// export default function PrivacyPolicySection({
//   heading,
//   paragraph,
//   content,
//   breadcrumbs = [],
// }: PrivacyPolicySectionTypes) {
//   return (
//     <section className={styles['PrivacyPolicySection']}>
//       <Breadcrumbs data={breadcrumbs} />
//       <div className={styles.content}>
//         <header>
//           <TextBlock
//             tag='h1'
//             value={heading}
//             className='heading-2xl'
//           />
//           {paragraph && (
//             <TextBlock
//               tag='p'
//               value={paragraph}
//             />
//           )}
//         </header>
//         {list.map(({ heading, text }, i) => (
//           <div
//             key={`privacy-policy-${i}`}
//             className={styles.section}
//           >
//             <header>
//               <span className={styles.num}>{i + 1}</span>
//               <TextBlock
//                 tag='h2'
//                 value={heading}
//                 className='text-xl light'
//               />
//             </header>
//             <div className={styles.text}>
//               <TextBlock
//                 value={text}
//                 bulletListClassName='list-check-gear'
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
