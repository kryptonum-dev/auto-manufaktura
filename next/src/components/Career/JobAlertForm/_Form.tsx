'use client';
import { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import Link from 'next/link';
import { REGEX } from '@/global/constants';
import { ArrowRightIcon } from '@/components/icons';
import FormState, { type FormStatusTypes } from '@/components/ui/FormState';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { FormTypes } from './JobAlertForm.types';
import styles from './JobAlertForm.module.scss';

export default function Form({ states, groupId }: FormTypes) {
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      legal: false,
    },
  });

  const submit = async (data: FieldValues) => {
    setStatus({ sending: true, success: undefined });
    try {
      const response = await fetch('/api/career/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, groupId }),
      });
      const responseData = await response.json();
      if (!response.ok || !responseData.success) throw new Error();
      setStatus({ sending: false, success: true });
      reset();
    } catch {
      setStatus({ sending: false, success: false });
    }
  };

  return (
    <div className={styles['Form']}>
      <FormState
        content={states}
        className={styles.formState}
        success={status.success}
        setStatus={setStatus}
      />
      <Loader
        loading={status.sending}
        className={styles.loader}
      />
      <form
        onSubmit={handleSubmit(submit)}
        noValidate
        data-hidden={status.sending || status.success !== undefined}
      >
        <Input
          type='email'
          label='E-mail'
          errors={errors}
          register={register('email', {
            required: { value: true, message: 'E-mail jest wymagany' },
            pattern: { value: REGEX.email, message: 'Niepoprawny adres e-mail' },
          })}
          filled={!!watch('email')}
          className={styles.input}
        />
        <Checkbox
          errors={errors}
          register={register('legal', {
            required: { value: true, message: 'Zgoda jest wymagana' },
          })}
          className={styles.checkbox}
        >
          Akceptuję{' '}
          <Link
            href='/polityka-prywatnosci'
            target='_blank'
            rel='noopener noreferrer'
            className='link'
          >
            politykę prywatności
          </Link>
          <ArrowRightIcon />
        </Checkbox>
        <Button
          text='Zapisz mnie'
          type='submit'
        />
      </form>
    </div>
  );
}
