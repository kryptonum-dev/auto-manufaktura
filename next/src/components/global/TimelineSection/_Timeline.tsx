'use client';
import { useEffect } from 'react';
import { useAnimate, useInView, stagger, motion } from 'motion/react';
import styles from './TimelineSection.module.scss';

export default function Timeline({ elements }: { elements: { label: string; text: React.ReactNode }[] }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: '-120px' });

  useEffect(() => {
    if (isInView) {
      animate(`li .${styles.label}`, { opacity: 1 }, { duration: 0.35, ease: 'easeIn', delay: stagger(0.4) });
      animate(`li p`, { opacity: 1 }, { duration: 0.35, ease: 'easeIn', delay: stagger(0.4) });
      animate(`li .${styles.icon}`, { opacity: 1 }, { duration: 0.3, ease: 'easeIn', delay: stagger(0.3) });
      animate(
        `li .${styles.icon}`,
        { backgroundColor: '#fbfdff' },
        { duration: 0.35, ease: 'easeIn', delay: stagger(0.38) }
      );
      animate(`li .${styles.progress} span`, { scaleY: 1 }, { duration: 0.4, ease: 'easeIn', delay: stagger(0.4) });
    }
  }, [isInView, elements, animate]);

  return (
    <div
      ref={scope}
      className={styles.timeline}
    >
      <ul className={styles.list}>
        {elements.map(({ label, text }, i) => (
          <li key={i}>
            <div className={styles.progress}>
              <motion.span initial={{ scaleY: 0 }} />
            </div>
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                className={styles.label}
              >
                {label}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, backgroundColor: '#02080d' }}
                className={styles.icon}
              />
            </div>
            <motion.p initial={{ opacity: 0 }}>{text}</motion.p>
          </li>
        ))}
      </ul>
    </div>
  );
}
