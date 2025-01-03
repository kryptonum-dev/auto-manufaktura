import type { LightTypes } from './Light.types';
import styles from './Light.module.scss';

export default function Light({ size = 'responsive', color = 'blue', className = '' }: LightTypes) {
  return (
    <div className={`${className} ${styles.wrapper}`}>
      <div className={`${styles.light} ${styles[color]} ${styles[size]}`}>
        <div className={styles.lights} />
      </div>
    </div>
  );
}
