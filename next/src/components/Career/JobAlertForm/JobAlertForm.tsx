import TextBlock from '@/components/ui/TextBlock';
import Form from './_Form';
import type { JobAlertFormTypes } from './JobAlertForm.types';
import styles from './JobAlertForm.module.scss';

export default function JobAlertForm({ heading, paragraph, formStates, groupId }: JobAlertFormTypes) {
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
    <div className={styles['JobAlertForm']}>
      <header>
        <TextBlock
          tag='h2'
          value={heading}
          className='text-xl light'
        />
        <TextBlock value={paragraph} />
      </header>
      <Form
        states={formStateContent}
        groupId={groupId}
      />
    </div>
  );
}
