import TextBlock from '@/components/ui/TextBlock';
import Button from '@/components/ui/Button';
import Light from '@/components/ui/Light';
import type { FormStateTypes } from './FormState.types';
import { SuccessIcon, ErrorIcon } from '@/components/icons';
import styles from './FormState.module.scss';

export default function FormState({ content, success, setStatus, withLight = false, className = '' }: FormStateTypes) {
  return (
    success !== undefined && (
      <div className={`${styles['FormState']} ${className}`}>
        {withLight && (
          <Light
            className={styles.light}
            color={success ? 'success' : 'error'}
          />
        )}
        {success ? (
          <div className={styles.content}>
            <SuccessIcon className={styles.icon} />
            <TextBlock
              className='text-xl'
              value={content.success.heading}
            />
            <TextBlock value={content.success.paragraph} />
            <Button
              onClick={() => setStatus({ success: undefined, sending: false })}
              text='Prześlij kolejne pytanie'
              theme='secondary'
            />
          </div>
        ) : (
          <div className={styles.content}>
            <ErrorIcon className={styles.icon} />
            <TextBlock
              className='text-xl'
              value={content.error.heading}
            />
            <TextBlock value={content.error.paragraph} />
            <Button
              onClick={() => setStatus({ success: undefined, sending: false })}
              text='Spróbuj ponownie'
              restartIcon={true}
            />
          </div>
        )}
      </div>
    )
  );
}
