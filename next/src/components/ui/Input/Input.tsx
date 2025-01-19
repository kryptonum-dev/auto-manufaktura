import { formatPhoneNumber } from '@/utils/format-phone-number';
import Textarea from './_Textarea';
import { ErrorIcon, SuccessIcon } from '@/components/icons';
import type { InputTypes } from './Input.types';
import styles from './Input.module.scss';

export default function Input({ label, register, filled, errors, className = '', ...props }: InputTypes) {
  const { type } = props;
  const Element = type === 'textarea' ? Textarea : 'input';

  const updateSpanPosition = (e: React.FormEvent<HTMLInputElement>) => {
    const parentElement = e.currentTarget.parentElement as HTMLDivElement;
    const spanElement = parentElement.querySelector(`.${styles.hidden}`) as HTMLSpanElement;
    if (parentElement && spanElement) {
      spanElement.textContent = type === 'tel' ? formatPhoneNumber(e.currentTarget.value) : e.currentTarget.value;
      const spanWidth = Math.min(
        spanElement.getBoundingClientRect().width,
        e.currentTarget.getBoundingClientRect().width - 10
      );
      parentElement.style.setProperty('--span', `${spanWidth || 0}px`);
    }
  };

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
        <span className={styles.hidden}></span>
        <Element
          {...register}
          name={register.name}
          {...props}
          {...(type !== 'textarea' && {
            onInput: updateSpanPosition,
            onFocus: updateSpanPosition,
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
