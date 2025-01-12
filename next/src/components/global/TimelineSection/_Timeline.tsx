'use client';
import { useRef, useEffect } from 'react';
import { useTransform, useScroll, motion, useMotionValueEvent } from 'motion/react';
import styles from './TimelineSection.module.scss';

function debounce(func: () => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

export default function Timeline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<HTMLLIElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const steps = useTransform(scrollYProgress, [0, 0.16, 0.32, 0.53, 0.74, 1], [0, 1, 2, 3, 4, 5.6]);

  useEffect(() => {
    if (!ref.current) return;
    listItemsRef.current = Array.from(ref.current?.querySelectorAll('li') || []);
  }, []);

  useMotionValueEvent(steps, 'change', latest => {
    if (!listItemsRef?.current || listItemsRef.current.length === 0) return;
    const step = Math.round(latest);
    listItemsRef.current.forEach((element, i) =>
      i < step ? element.classList.add(styles.active) : element.classList.remove(styles.active)
    );
  });

  useEffect(() => {
    if (!ref?.current) return;
    const container = ref.current;

    function updateLayout() {
      const progress = container.querySelector(`.${styles.progress}`) as HTMLDivElement;
      const first = container.querySelector('li:first-child') as HTMLLIElement;
      const last = container.querySelector('li:last-child') as HTMLLIElement;
      if (progress && first && last) progress.style.height = `${last.offsetTop - first.offsetTop}px`;
    }

    updateLayout();
    const debouncedUpdateLayout = debounce(updateLayout, 300);
    window.addEventListener('resize', debouncedUpdateLayout);
    return () => window.removeEventListener('resize', debouncedUpdateLayout);
  }, []);

  return (
    <div
      className={styles.timeline}
      ref={ref}
    >
      {children}
      <div className={styles.progress}>
        <motion.div
          className={styles.line}
          style={{ height }}
        />
      </div>
    </div>
  );
}
