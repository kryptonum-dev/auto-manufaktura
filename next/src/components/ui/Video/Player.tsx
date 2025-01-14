import MuxPlayer from '@mux/mux-player-react/lazy';
import type { VideoDataTypes } from './Video.types';
import styles from './Video.module.scss';

export function Player({
  asset: { playbackId, aspectRatio },
  withControls = false,
  withPoster = true,
}: VideoDataTypes) {
  if (!playbackId) return null;
  return (
    <MuxPlayer
      disableCookies
      disableTracking
      autoPlay
      muted
      playbackId={playbackId}
      style={{ aspectRatio: aspectRatio ? aspectRatio.replace(':', '/') : 'auto' }}
      className={`${styles['Video']} ${withControls ? styles.controls : ''}`}
      {...(!withControls ? { loop: true } : { accentColor: '#fbfdff', primaryColor: '#545966' })}
      {...(!withPoster && { poster: '' })}
    />
  );
}
