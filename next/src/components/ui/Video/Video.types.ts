export type VideoDataTypes = {
  asset: {
    playbackId: string;
    aspectRatio: string;
  };
  withControls?: boolean;
  withPoster?: boolean;
  placeholder?: string;
};

export type VideoTypes = VideoDataTypes & {
  className?: string;
  threshold?: number;
  rootMargin?: string;
};
