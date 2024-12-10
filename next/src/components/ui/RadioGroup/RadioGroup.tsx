import type { RadioGroupTypes } from './RadioGroup.types';
import styles from './RadioGroup.module.scss';
import { ErrorIcon, CheckIcon } from '@/components/icons';

export default function RadioGroup({ label, register, errors, options, className = '', ...props }: RadioGroupTypes) {
  return (
    <div
      className={`${styles['RadioGroup']} ${className}`}
      aria-invalid={!!errors[register.name]}
    >
      <div className={`${styles.info} text-m light`}>
        <p>{label}</p>
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
      <div
        className={styles.options}
        role='radiogroup'
      >
        {options.map((option, index) => {
          const { key, value } =
            typeof option === 'string' ? { key: option, value: option } : { key: option.key, value: option.value };
          return (
            <label
              key={key}
              className='chip'
            >
              <div>
                <CheckIcon />
                <input
                  type='radio'
                  value={key}
                  {...register}
                  name={register.name}
                  id={`${register.name}-${index}`}
                  {...props}
                />
                <p>{value}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
