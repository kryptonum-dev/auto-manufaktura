export type VideoDataTypes = {
  asset: {
    playbackId: string;
    aspectRatio: string;
  };
  withControls?: boolean;
};

export type VideoLazyTypes = VideoDataTypes & {
  className?: string;
  threshold?: number;
  rootMargin?: string;
};
