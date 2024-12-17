'use client';
import { useEffect } from 'react';
import { useAnimate, useInView, stagger, motion } from 'motion/react';
import { ListTypes } from './FeaturesSection.types';
import styles from './FeaturesSection.module.scss';

export default function List({ elements, Icon }: ListTypes) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: '-150px' });

  useEffect(() => {
    if (isInView) {
      animate(`.${styles.progressbar} div`, { height: '100%' }, { duration: 0.2 * elements.length, delay: 0.35 });
      animate(`.${styles.item} p`, { x: 0, opacity: 1 }, { duration: 0.35, delay: stagger(0.2) });
      animate(
        `.${styles.item} .${styles.icon}`,
        { x: 0, opacity: 1, scale: 1 },
        { duration: 0.35, delay: stagger(0.2) }
      );
    }
  }, [isInView, elements, animate]);

  return (
    <div
      className={styles.list}
      ref={scope}
    >
      {elements.map((Element, i) => (
        <div
          key={`item-${i}`}
          className={styles.item}
        >
          <motion.span
            initial={{ x: -15, scale: 0, opacity: 0 }}
            className={styles.icon}
          >
            {Icon}
          </motion.span>
          <motion.p initial={{ x: 15, opacity: 0 }}>{Element}</motion.p>
        </div>
      ))}
      <div className={styles.progressbar}>
        <div />
      </div>
    </div>
  );
}
