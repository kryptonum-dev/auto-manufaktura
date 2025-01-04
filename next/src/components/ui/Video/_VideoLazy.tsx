'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { VideoLazyTypes } from './Video.types';

const Video = dynamic(() => import('./Video'), { ssr: false });

export function VideoLazy({ className = '', threshold = 0, rootMargin = '50%', ...props }: VideoLazyTypes) {
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
  }, []);

  return (
    <div
      ref={videoRef}
      className={className}
    >
      {isVisible && <Video {...props} />}
    </div>
  );
}
