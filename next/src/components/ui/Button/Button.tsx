import Link from 'next/link';
import type { ButtonDataTypes } from './Button.types';
import styles from './Button.module.scss';

export default function Button({
  children,
  text,
  href,
  linkType = 'internal',
  theme = 'primary',
  className = '',
  ...props
}: ButtonDataTypes) {
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
            <ArrowRight className={styles.arrow} />
            <ArrowRight className={styles.arrow} />
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
