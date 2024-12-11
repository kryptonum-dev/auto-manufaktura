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
            size='small'
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
            {content.success.ctaText && (
              <Button
                onClick={() => setStatus({ success: undefined, sending: false })}
                text={content.success.ctaText}
                theme='secondary'
              />
            )}
          </div>
        ) : (
          <div className={styles.content}>
            <ErrorIcon className={styles.icon} />
            <TextBlock
              className='text-xl'
              value={content.error.heading}
            />
            <TextBlock value={content.error.paragraph} />
            {content.error.ctaText && (
              <Button
                onClick={() => setStatus({ success: undefined, sending: false })}
                text={content.error.ctaText}
                restartIcon={true}
              />
            )}
          </div>
        )}
      </div>
    )
  );
}
