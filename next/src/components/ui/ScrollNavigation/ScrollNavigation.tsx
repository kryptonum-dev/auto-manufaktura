'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { ScrollNavigationTypes } from './ScrollNavigation.types';
import styles from './ScrollNavigation.module.scss';

export default function ScrollNavigation({
  initialActiveSection,
  headings,
  navAriaLabel,
  sectionSelector,
  threshold = 0.2,
  className = '',
}: ScrollNavigationTypes) {
  const [activeSection, setActiveSection] = useState(initialActiveSection);

  useEffect(() => {
    const sectionElements = document.querySelectorAll(sectionSelector);
    if (!sectionElements) return;

    const observer = new IntersectionObserver(entries =>
      entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id), { threshold })
    );

    sectionElements.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionSelector, threshold]);

  return (
    <nav
      aria-label={navAriaLabel}
      className={`${styles['ScrollNavigation']} ${className}`}
    >
      <p className='text-m light'>Tematy w artykule</p>
      <ul>
        {headings.map(({ slug, text }) => (
          <li key={`link-${slug}`}>
            <Link
              data-active={slug === activeSection}
              className='text-m light'
              href={`#${slug}`}
            >
              <ArrowIcon /> <span>{text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const ArrowIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='none'
    {...props}
  >
    <path
      stroke='#FBFDFF'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M6 3.333 10 8l-4 4.667'
    />
  </svg>
);
