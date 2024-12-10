import type { LoaderTypes } from './Loader.types';
import styles from './Loader.module.scss';

export default function Loader({ loading, className = '' }: LoaderTypes) {
  return (
    loading && (
      <div className={`${styles.Loader} ${className}`}>
        <div className={styles.spinner}></div>
      </div>
    )
  );
}
