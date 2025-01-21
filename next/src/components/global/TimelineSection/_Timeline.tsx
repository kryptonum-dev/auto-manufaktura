'use client';
import { useRef, useEffect } from 'react';
import styles from './TimelineSection.module.scss';

export default function Timeline({ children }: { children: React.ReactNode }) {
  const scrollPercentage = 0.5;
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgressPosition = () => {
      const lastItem = timelineRef.current?.querySelector('li:last-child') as HTMLLIElement;
      if (!lastItem || !progressRef?.current) return;
      progressRef.current.style.bottom = `${Math.max(0, lastItem.getBoundingClientRect().height - 12)}px`;
    };

    const updateProgressLine = () => {
      if (!progressRef?.current) return;
      const lineElement = progressRef.current.querySelector(`.${styles.line}`) as HTMLDivElement;
      const progressRect = progressRef.current.getBoundingClientRect();
      const viewportPoint = window.innerHeight * scrollPercentage;

      const start = progressRect.top - viewportPoint;
      const end = progressRect.bottom - viewportPoint;
      const total = end - start;
      const current = -start;

      const progress = Math.max(0, Math.min(1, current / total));
      lineElement.style.transform = `scaleY(${progress})`;
    };

    let id: number;
    const scrollHandler = () => {
      if (id) cancelAnimationFrame(id);
      id = requestAnimationFrame(updateProgressLine);
    };

    updateProgressPosition();
    updateProgressLine();

    window.addEventListener('resize', updateProgressPosition, { passive: true });
    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('resize', updateProgressPosition);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    const items = Array.from(timelineRef.current?.querySelectorAll('li') || []);
    if (!items || !items.length) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.setAttribute('data-active', entry.isIntersecting.toString());
        });
      },
      {
        threshold: 0,
        rootMargin: `0px 0px -${100 - scrollPercentage * 100}% 0px`,
      }
    );

    items.forEach(item => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={styles.timeline}
      ref={timelineRef}
    >
      <div className={styles.wrapper}>
        {children}
        <div
          className={styles.progress}
          ref={progressRef}
        >
          <div className={styles.line} />
        </div>
      </div>
    </div>
  );
}
