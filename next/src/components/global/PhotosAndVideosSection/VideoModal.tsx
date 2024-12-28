import { VideoLazy } from '@/components/ui/Video';
import type { VideoModalTypes } from './PhotosAndVideosSection.types';
import styles from './PhotosAndVideosSection.module.scss';

export default function VideoModal({ video, setVideo, closeIcon }: VideoModalTypes) {
  return (
    <>
      <div className={styles.overlay} />
      <div
        className={styles.modal}
        onClick={() => setVideo(null)}
      >
        <div
          className={styles.content}
          onClick={e => e.stopPropagation()}
        >
          <button
            className={styles.button}
            aria-label='Zamknij okno modalne'
            onClick={() => setVideo(null)}
          >
            {closeIcon}
          </button>
          <VideoLazy
            {...video}
            withControls={true}
          />
        </div>
      </div>
    </>
  );
}
