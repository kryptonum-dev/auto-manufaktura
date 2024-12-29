import MuxPlayer from '@mux/mux-player-react';
import type { VideoDataTypes } from './Video.types';
import styles from './Video.module.scss';

export default function Video({ asset: { playbackId, aspectRatio }, withControls = false }: VideoDataTypes) {
  return (
    <MuxPlayer
      disableCookies
      disableTracking
      autoPlay
      muted
      playbackId={playbackId}
      style={{ aspectRatio: aspectRatio.replace(':', '/') }}
      className={`${styles['Video']} ${withControls ? styles.controls : ''}`}
      {...(!withControls ? { playerInitTime: 0, loop: true } : { accentColor: '#fbfdff', primaryColor: '#545966' })}
    />
  );
}
