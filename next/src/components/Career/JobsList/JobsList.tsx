'use client';
import { useState, useMemo } from 'react';
//import JobPostingSchema from '@/global/schema/JobPosting';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import TextBlock from '@/components/ui/TextBlock';
import Img from '@/components/ui/Img';
import type { JobsListTypes } from './JobsList.types';
import styles from './JobsList.module.scss';

export default function JobsList({ workshops, jobOffers, apply }: JobsListTypes) {
  const [workshop, setWorkshop] = useState<string | undefined>(undefined);

  const _jobOffers = useMemo(() => {
    if (!workshop) return jobOffers;
    return jobOffers.filter(({ workshops }) => workshops.find(item => item.email === workshop));
  }, [jobOffers, workshop]);

  return (
    <>
      <div className={styles['JobsList']}>
        {workshops.length > 1 && (
          <div className={styles.workshops}>
            <p className='light'>Wybierz warsztat</p>
            {workshops.map(({ key, value }) => (
              <Chip
                tag='button'
                key={key}
                data-active={workshop === key}
                onClick={() => setWorkshop(prev => (prev === key ? undefined : key))}
              >
                <p>{value}</p>
              </Chip>
            ))}
          </div>
        )}
        <div className={styles.list}>
          {_jobOffers.map(({ name, intro, tags, sections, workshops }, i) => (
            <div
              className={styles['JobOffer']}
              key={`job-offer-${i}`}
            >
              <div className={styles.content}>
                <header>
                  <h2 className='text-xl light'>{name}</h2>
                  {intro && <TextBlock value={intro} />}
                </header>
                {tags && (
                  <div className={styles.tags}>
                    {tags.map(({ label, icon }, i) => (
                      <span key={`tag-${i}`}>
                        <Img
                          data={icon}
                          sizes='21px'
                        />
                        {label}
                      </span>
                    ))}
                  </div>
                )}
                {sections && (
                  <>
                    {sections.map(({ heading, list }, index) => (
                      <div
                        className={styles.section}
                        key={`section-${index}`}
                      >
                        <TextBlock value={heading} />
                        <ul className='text-m light list-check-round'>
                          {list.map((item, i) => (
                            <li key={`section-${index}-${i}`}>
                              <TextBlock
                                tag='span'
                                value={item}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <Button
                text='Aplikuj'
                aria-label={`Aplikuj na stanowisko: ${name}`}
                onClick={() => apply(name, workshops[0].email)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <JobPostingSchema data={jobOffers.map(({ name, workshops }) => ({ name, workshops }))} /> */}
    </>
  );
}
