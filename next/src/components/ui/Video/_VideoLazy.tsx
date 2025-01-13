'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, memo } from 'react';
import type { VideoLazyTypes } from './Video.types';

const Video = dynamic(() => import('./Video'));

function _VideoLazy({ className = '', threshold = 0, rootMargin = '70%', ...props }: VideoLazyTypes) {
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
      {isVisible && <Video {...props} />}
    </div>
  );
}

export const VideoLazy = memo(_VideoLazy);
