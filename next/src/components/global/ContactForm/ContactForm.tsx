import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TextBlock from '@/components/ui/TextBlock';
import WorkshopCard from '@/components/ui/WorkshopCard';
import Form from './_Form';
import type { ContactFormTypes } from './ContactForm.types';
import styles from './ContactForm.module.scss';

export default function ContactForm({ breadcrumbs, index, heading, text, workshops }: ContactFormTypes) {
  const formWorkshops = workshops.map(workshop => ({
    value: workshop.address.street,
    key: workshop.email,
    departments: workshop.departments?.map(({ name, email }) => ({ value: name, key: email })) ?? [],
  }));

  return (
    <section className={`${styles['ContactForm']} max-width`}>
      <Breadcrumbs {...breadcrumbs} />
      <div className={styles.wrapper}>
        <header>
          <TextBlock
            value={heading}
            className='heading-xs'
            tag={index === 0 ? 'h1' : 'h2'}
          />
          {text && (
            <p>
              <MessageIcon />
              <TextBlock
                tag='span'
                value={text}
              />
            </p>
          )}
        </header>
        <div className={styles.workshops}>
          {workshops.map((workshop, i) => (
            <WorkshopCard
              key={`workshop-${i}`}
              {...workshop}
              imgPriority={index === 0 && i === 0}
            />
          ))}
        </div>
        <div className={styles.form}>
          <Form workshops={formWorkshops} />
        </div>
      </div>
    </section>
  );
}

const MessageIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={21}
    viewBox='0 0 20 21'
    fill='none'
    {...props}
  >
    <path
      fill='#FBFDFF'
      d='M4 10.5h9v4H4z'
    />
    <path
      fill='#2F64F0'
      d='M18.335 7.583a5.417 5.417 0 0 0-9.69-3.327 7.917 7.917 0 0 1 7.602 8.185l.276.074a1.083 1.083 0 0 0 1.327-1.326l-.106-.397a1.43 1.43 0 0 1 .104-.96 5.397 5.397 0 0 0 .487-2.249Z'
    />
    <path
      fill='#2F64F0'
      fillRule='evenodd'
      d='M15.001 12.166a6.667 6.667 0 0 1-9.542 6.017 1.393 1.393 0 0 0-.958-.108l-1.022.274a1.083 1.083 0 0 1-1.326-1.327L2.426 16c.086-.32.035-.66-.108-.958a6.667 6.667 0 1 1 12.683-2.875ZM5.418 13a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Zm2.917 0a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Zm2.916 0a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Z'
      clipRule='evenodd'
    />
  </svg>
);
