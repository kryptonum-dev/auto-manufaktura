'use client';
import { useState } from 'react';
import styles from './Pagination.module.scss';

export default function DropdownList({ links }: { links: React.ReactNode[] }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className={styles.dropdown}
      data-expanded={isDropdownOpen}
    >
      <button
        onClick={() => setDropdownOpen(prev => !prev)}
        aria-label='Pokaż więcej stron'
        className='text-m light'
      >
        ...
      </button>
      <div className={styles.wrapper}>
        <div className={styles.list}>{links}</div>
      </div>
    </div>
  );
}
