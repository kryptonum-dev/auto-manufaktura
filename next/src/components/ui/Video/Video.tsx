import MuxPlayer from '@mux/mux-player-react';
import type { VideoDataTypes } from './Video.types';
import styles from './Video.module.scss';

export default function Video({ asset: { playbackId, aspectRatio } }: VideoDataTypes) {
  return (
    <MuxPlayer
      disableTracking
      disableCookies
      playerInitTime={0}
      muted
      autoPlay
      loop
      playbackId={playbackId}
      style={{ aspectRatio: aspectRatio.replace(':', '/') }}
      className={styles['Video']}
    />
  );
}
