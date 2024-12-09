import Textarea from './_Textarea';
import { ErrorIcon, SuccessIcon } from '@/components/icons';
import type { InputTypes } from './Input.types';
import styles from './Input.module.scss';

export default function Input({ label, register, filled, errors, className = '', ...props }: InputTypes) {
  const { type } = props;
  const Element = type === 'textarea' ? Textarea : 'input';

  return (
    <label
      className={`${styles['Input']} ${className}`}
      aria-invalid={!!errors[register.name]}
      data-filled={filled}
    >
      <div className={`${styles.info} text-m light`}>
        <p>{label}</p>
        {errors[register.name]?.message?.toString() && (
          <p
            role='alert'
            className={styles.errorText}
          >
            {errors[register.name]?.message?.toString()}
          </p>
        )}
      </div>
      <div className={styles.control}>
        <Element
          {...register}
          name={register.name}
          {...props}
          {...(type !== 'textarea' && {
            onInput: e => {
              const parentElement = e.currentTarget.parentElement as HTMLDivElement;
              if (parentElement) parentElement.style.setProperty('--length', `${e.currentTarget.value.length || 0}`);
            },
          })}
        />
        <span className={styles.icon}>
          <ErrorIcon className={styles.error} />
          <SuccessIcon className={styles.success} />
        </span>
      </div>
    </label>
  );
}
