'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, memo } from 'react';
import type { VideoTypes } from './Video.types';

const Player = dynamic(() => import('./Player').then(m => m.Player));

function Video({ className = '', threshold = 0, rootMargin = '100%', ...props }: VideoTypes) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        }),
      { threshold, rootMargin }
    );

    if (videoRef?.current) observer.observe(videoRef.current);
    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div
      ref={videoRef}
      className={className}
    >
      {isVisible && <Player {...props} />}
    </div>
  );
}

export default memo(Video);
