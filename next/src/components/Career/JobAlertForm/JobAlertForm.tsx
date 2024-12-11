import TextBlock from '@/components/ui/TextBlock';
import Form from './_Form';
import type { JobAlertFormTypes } from './JobAlertForm.types';
import styles from './JobAlertForm.module.scss';

export default function JobAlertForm({ heading, paragraph, formStates }: JobAlertFormTypes) {
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
      <Form states={formStates} />
    </div>
  );
}
