import type { SwitchTypes } from './Switch.types';
import styles from './Switch.module.scss';

export default function Switch({ children, className = '', ...props }: SwitchTypes) {
  return (
    <label className={`${styles['Switch']} ${className}`}>
      <input
        type='checkbox'
        {...props}
      />
      <div className={styles.switcher}>
        <div>
          <CheckIcon className={styles.icon} />
        </div>
      </div>
      <span>{children}</span>
    </label>
  );
}

const CheckIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={28}
    height={28}
    viewBox='0 0 28 28'
    fill='none'
    {...props}
  >
    <path
      fill='#2F64F0'
      fillRule='evenodd'
      d='M28 14c0 7.732-6.268 14-14 14S0 21.732 0 14 6.268 0 14 0s14 6.268 14 14Zm-8.358-4.242c.41.41.41 1.074 0 1.485l-7 7a1.05 1.05 0 0 1-1.484 0l-2.8-2.8a1.05 1.05 0 0 1 1.484-1.486l2.058 2.058 3.129-3.129 3.128-3.128a1.05 1.05 0 0 1 1.485 0Z'
      clipRule='evenodd'
    />
  </svg>
);
