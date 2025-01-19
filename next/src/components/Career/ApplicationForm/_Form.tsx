'use client';
import { useMemo, useState, useEffect } from 'react';
import { useFormContext, type FieldValues, Controller } from 'react-hook-form';
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
import FIlesInput, { type FileTypes } from '@/components/ui/FilesInput';
import Loader from '@/components/ui/Loader';
import type { FormTypes } from './ApplicationForm.types';
import styles from './ApplicationForm.module.scss';

export default function Form({ formStates, workshops }: FormTypes) {
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useFormContext();

  const workshopValue = watch('workshop');

  const _jobs = useMemo(() => {
    return workshops.find(({ email }) => email === workshopValue)?.jobs ?? [];
  }, [workshopValue, workshops]);

  useEffect(() => {
    const currentJob = watch('job');
    if (!_jobs.includes(currentJob)) {
      setValue('job', _jobs[0] || '');
    }
  }, [_jobs, setValue, watch]);

  const submit = async (data: FieldValues) => {
    setStatus({ sending: true, success: undefined });
    try {
      const response = await fetch('/api/career/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
          options={workshops.map(({ email, address }) => ({ key: email, value: address }))}
          errors={errors}
          className={styles.radioGroup}
        />
        <Select
          label='Stanowisko'
          errors={errors}
          options={_jobs}
          register={register('job', {
            required: { value: true, message: 'Stanowisko jest wymagane' },
          })}
          value={watch('job')}
        />
        <Input
          type='tel'
          inputMode='numeric'
          label='Numer telefonu (opcjonalne)'
          placeholder='+48 ___ - ___ - ___'
          filled={!!watch('phone')}
          register={register('phone', {
            validate: {
              checkPattern: value => REGEX.phone.test(formatPhoneNumber(value)) || 'Niepoprawny numer',
            },
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
        <Controller
          name='files'
          control={control}
          defaultValue={[]}
          rules={{
            validate: {
              required: (files: FileTypes[]) => files.length > 0 || 'CV jest wymagane',
              maxSize: (files: FileTypes[]) => {
                const filesSize = files.reduce((sum, { size }) => sum + size, 0);
                return filesSize <= 15 * 1024 * 1024 || `Za duży rozmiar ${files.length === 1 ? 'pliku' : 'plików'}`;
              },
              hasBufferBase64: (files: FileTypes[]) =>
                !files.some(file => file.bufferBase64 === '') || `Nieprawidłowy plik`,
            },
          }}
          render={({ field, fieldState }) => (
            <FIlesInput
              onChange={field.onChange}
              fieldState={fieldState}
              value={field.value}
              className={styles.filesInput}
            />
          )}
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
