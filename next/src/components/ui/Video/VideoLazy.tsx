'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { VideoDataTypes } from './Video.types';

const Video = dynamic(() => import('./Video'), { ssr: false });

export function VideoLazy({ data, className = '' }: { data: VideoDataTypes; className?: string }) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        }),
      { threshold: 0 }
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
      {isVisible && <Video {...data} />}
    </div>
  );
}
