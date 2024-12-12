'use client';
import { useMemo, useState, useEffect } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import Link from 'next/link';
import { REGEX } from '@/global/constants';
import { formatPhoneNumber } from '@/utils/format-phone-number';
import { ArrowRightIcon } from '@/components/icons';
import FormState, { type FormStatusTypes } from '@/components/ui/FormState';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import RadioGroup from '@/components/ui/RadioGroup';
import Select from '@/components/ui/Select';
import Loader from '@/components/ui/Loader';
import type { FormTypes } from './ApplicationForm.types';
import styles from './ApplicationForm.module.scss';

export default function Form({ application, setApplication, formStates, jobs, workshops }: FormTypes) {
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      message: '',
      job: application.job,
      legal: false,
      phone: '',
      workshop: application.email,
    },
  });

  useEffect(() => setValue('workshop', application.email), [application.email, setValue]);

  const workshopKey = watch('workshop');

  const _jobs = useMemo(() => {
    const result = jobs
      .filter(({ workshops }) => workshops.find(item => item.key === workshopKey))
      .map(({ name }) => name);
    return result;
  }, [workshopKey, jobs]);

  const submit = async (data: FieldValues) => {
    console.log(data);
    setStatus({ sending: true, success: undefined });
    try {
      // const response = await fetch('/api/job', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const responseData = await response.json();

      // if (!response.ok || !responseData.success) throw new Error();
      setTimeout(() => {
        setStatus({ sending: false, success: false });
        reset();
      }, 2000);
    } catch {
      setStatus({ sending: false, success: false });
    }
  };

  return (
    <div className={styles['Form']}>
      <div className={styles.formState}>
        <FormState
          content={formStates}
          success={status.success}
          setStatus={setStatus}
          withLight
        />
      </div>
      <Loader
        loading={status.sending}
        className={styles.loader}
      />
      <form
        onSubmit={handleSubmit(submit)}
        noValidate
        data-hidden={status.sending || status.success !== undefined}
      >
        <RadioGroup
          label='Wybierz warsztat'
          register={register('workshop', {
            required: { value: true, message: 'Warsztat jest wymagany' },
          })}
          options={workshops}
          errors={errors}
          className={styles.radioGroup}
        />
        <Select
          label='Stanowisko'
          errors={errors}
          options={_jobs}
          register={register('job', {
            required: { value: true, message: 'Stanowisko jest wymagane' },
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
              setApplication(prev => ({ ...prev, job: e.target.value })),
          })}
          value={application.job}
        />

        <Input
          type='tel'
          inputMode='numeric'
          label='Numer telefonu (opcjonalne)'
          placeholder='+48 ___ - ___ - ___'
          filled={!!watch('phone')}
          register={register('phone', {
            pattern: { value: REGEX.phone, message: 'Niepoprawny numer' },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value = formatPhoneNumber(e.target.value);
            },
          })}
          errors={errors}
        />
        <Input
          type='email'
          label='E-mail'
          errors={errors}
          register={register('email', {
            required: { value: true, message: 'E-mail jest wymagany' },
            pattern: { value: REGEX.email, message: 'Niepoprawny adres e-mail' },
          })}
          filled={!!watch('email')}
        />
        <Input
          type='textarea'
          label='Dodatkowe informacje (opcjonalne)'
          errors={errors}
          register={register('message')}
          filled={!!watch('message')}
          className={styles.textarea}
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
          text='Wyślij wiadomość'
          type='submit'
        />
      </form>
    </div>
  );
}
