import { ErrorIcon } from '@/components/icons';
import type { CheckboxTypes } from './Checkbox.types';
import styles from './Checkbox.module.scss';

export default function Checkbox({ register, errors, children, className = '', ...props }: CheckboxTypes) {
  return (
    <label
      className={`${styles['Checkbox']} ${className} text-m light`}
      aria-invalid={!!errors[register.name]}
    >
      <div className={styles.control}>
        <div className={styles.box}>
          <div>
            <input
              type='checkbox'
              {...register}
              name={register.name}
              {...props}
            />
            <CheckIcon />
          </div>
        </div>
        <p className={styles.label}>{children}</p>
      </div>
      {errors[register.name]?.message?.toString() && (
        <p
          role='alert'
          className={styles.error}
        >
          <ErrorIcon />
          {errors[register.name]?.message?.toString()}
        </p>
      )}
    </label>
  );
}

const CheckIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={11}
    height={9}
    viewBox='0 0 11 9'
    fill='none'
    {...props}
  >
    <path
      stroke='#FBFDFF'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m1 5.418 2.571 2.946L10 1'
    />
  </svg>
);
