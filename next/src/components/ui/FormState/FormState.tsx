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
            {content.success.Heading}
            {content.success.Paragraph}
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
            {content.error.Heading}
            {content.error.Paragraph}
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
