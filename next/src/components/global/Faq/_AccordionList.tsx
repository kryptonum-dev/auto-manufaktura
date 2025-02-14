'use client';
import { useState } from 'react';
import type { AccordionListTypes } from './Faq.types';
import styles from './Faq.module.scss';

export default function AccordionList({ list }: AccordionListTypes) {
  const [activeIndex, setActiveIndex] = useState(0);

  const togglePanel = (index: number) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      setActiveIndex(prev => (prev === index ? -1 : index));
    };
  };

  return (
    <div className={styles.list}>
      {list.map(({ question, answer }, i) => (
        <details
          open
          key={`faq-${i}`}
          data-opened={activeIndex === i}
        >
          <summary
            onClick={togglePanel(i)}
            tabIndex={activeIndex === i ? -1 : 0}
          >
            {question}
            <span className={styles.icon} />
          </summary>
          <div
            className={styles.answer}
            onClick={e => e.stopPropagation()}
          >
            <div>{answer}</div>
          </div>
        </details>
      ))}
    </div>
  );
}
