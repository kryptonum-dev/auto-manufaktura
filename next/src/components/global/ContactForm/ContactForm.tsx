import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TextBlock from '@/components/ui/TextBlock';
import WorkshopCard from '@/components/ui/WorkshopCard';
import Form from './_Form';
import { MessageIcon } from '@/components/icons';
import type { ContactFormTypes } from './ContactForm.types';
import styles from './ContactForm.module.scss';

export default function ContactForm({ breadcrumbs, index, heading, text, workshops, formStates }: ContactFormTypes) {
  const formWorkshops = workshops.map(workshop => ({
    value: workshop.address.street,
    key: workshop.email,
    departments: workshop.departments?.map(({ name, email }) => ({ value: name, key: email })) ?? [],
  }));

  const formStateContent = {
    success: {
      Heading: (
        <TextBlock
          className='text-xl'
          value={formStates.success.heading}
        />
      ),
      Paragraph: <TextBlock value={formStates.success.paragraph} />,
      ctaText: formStates.success.ctaText || undefined,
    },
    error: {
      Heading: (
        <TextBlock
          className='text-xl'
          value={formStates.error.heading}
        />
      ),
      Paragraph: <TextBlock value={formStates.error.paragraph} />,
      ctaText: formStates.error.ctaText || undefined,
    },
  };

  return (
    <section className={`${styles['ContactForm']} max-width`}>
      {breadcrumbs && <Breadcrumbs data={breadcrumbs} />}
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
          <Form
            workshops={formWorkshops}
            states={formStateContent}
          />
        </div>
      </div>
    </section>
  );
}
