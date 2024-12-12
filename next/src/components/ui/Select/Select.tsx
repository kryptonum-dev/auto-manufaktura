import { ErrorIcon } from '@/components/icons';
import type { SelectTypes } from './Select.types';
import styles from './Select.module.scss';

export default function Select({
  label,
  options,
  errors,
  register,
  placeholderOption,
  className = '',
  ...props
}: SelectTypes) {
  return (
    <label
      aria-invalid={!!errors[register.name]}
      className={`${styles['Select']} ${className}`}
    >
      <div className={`${styles.info} text-m light`}>
        <p className={styles.label}>{label}</p>
        {errors[register.name]?.message?.toString() && (
          <p
            role='alert'
            className={styles.error}
          >
            <ErrorIcon />
            {errors[register.name]?.message?.toString()}
          </p>
        )}
      </div>
      <div className={styles.control}>
        <select
          {...register}
          name={register.name}
          {...props}
        >
          {placeholderOption && <option value=''>{placeholderOption}</option>}
          {options.map(option => {
            const { key, value } =
              typeof option === 'string' ? { key: option, value: option } : { key: option.key, value: option.value };
            return (
              <option
                value={key}
                key={key}
              >
                {value.length > 33 ? `${value.slice(0, 30)}...` : value}
              </option>
            );
          })}
        </select>
        <ArrowDown className={styles.icon}></ArrowDown>
      </div>
    </label>
  );
}

const ArrowDown = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='none'
    {...props}
  >
    <path
      stroke='#CBD0D0'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12.665 6 8 10 3.332 6'
    />
  </svg>
);
