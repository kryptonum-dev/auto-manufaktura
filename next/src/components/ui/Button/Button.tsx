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
  restartIcon = false,
  ...props
}: ButtonTypes) {
  const isExternal = linkType === 'external';
  const Element = href ? (isExternal ? 'a' : Link) : 'button';

  return (
    <Element
      href={href || ''}
      className={`${styles['Button']} ${className}`}
      data-theme={theme}
      {...(isExternal && { target: '_blank', rel: 'noreferrer' })}
      {...props}
    >
      <div className={styles.wrapper}>
        {theme !== 'tetriary' && (
          <>
            {restartIcon ? <RestartIcon className={styles.icon} /> : <ArrowRight className={styles.icon} />}
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

const RestartIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={13}
    height={12}
    viewBox='0 0 13 12'
    fill='none'
    {...props}
  >
    <path
      stroke='#FBFDFF'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m9.682 4.025-.354-.353A4 4 0 1 0 10.468 6m-.786-1.975H7.561m2.121 0V1.904'
    />
  </svg>
);
