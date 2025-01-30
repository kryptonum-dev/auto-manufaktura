import Link from 'next/link';
import type { ButtonTypes } from './Button.types';
import styles from './Button.module.scss';

export default function Button({
  children,
  text,
  href,
  linkType = 'internal',
  theme = 'primary',
  className = '',
  ...props
}: ButtonTypes) {
  const isExternal = linkType === 'external';

  if (!href) {
    return (
      <button
        className={`${styles['Button']} ${className}`}
        data-theme={theme}
        {...props}
      >
        <div className={styles.wrapper}>
          {theme !== 'tetriary' && (
            <>
              <ArrowRight className={styles.icon} />
              <ArrowRight className={styles.icon} />
            </>
          )}
          <span className={styles.text}>{children || text}</span>
        </div>
      </button>
    );
  }

  const Element = isExternal ? 'a' : Link;

  return (
    <Element
      href={href}
      {...(isExternal && { target: '_blank', rel: 'noopener' })}
      className={`${styles['Button']} ${className}`}
      data-theme={theme}
      {...props}
    >
      <div className={styles.wrapper}>
        {theme !== 'tetriary' && (
          <>
            <ArrowRight className={styles.icon} />
            <ArrowRight className={styles.icon} />
          </>
        )}
        <span className={styles.text}>{children || text}</span>
      </div>
    </Element>
  );
}

const ArrowRight = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 13 12'
    width={13}
    height={12}
    fill='none'
    {...props}
  >
    <path
      stroke='#FBFDFF'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M2.5 6h8m0 0-3-3m3 3-3 3'
    />
  </svg>
);
