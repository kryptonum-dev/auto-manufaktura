'use client';
import { useEffect, useRef, useState, memo } from 'react';
import Video from './Video';
import type { VideoLazyTypes } from './Video.types';

function _VideoLazy({ className = '', threshold = 0, rootMargin = '50%', ...props }: VideoLazyTypes) {
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
