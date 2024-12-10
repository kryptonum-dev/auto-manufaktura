'use client';
import { useMemo, useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import Link from 'next/link';
import { REGEX } from '@/global/constants';
import { formatPhoneNumber } from '@/utils/format-phone-number';
import { ArrowRightIcon } from '@/components/icons';
import { FormTypes } from './ContactForm.types';
import FormState, { type FormStatusTypes } from '@/components/ui/FormState';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import RadioGroup from '@/components/ui/RadioGroup';
import Loader from '@/components/ui/Loader';
import styles from './ContactForm.module.scss';

export default function Form({ workshops, states }: FormTypes) {
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
      topic: '',
      legal: false,
      phone: '',
      workshop: workshops[0].key,
      department: workshops[0].departments.length > 0 ? workshops[0].key : '',
    },
  });

  const workshopKey = watch('workshop');
  const workshop = useMemo(() => {
    const item = workshops.find(({ key }) => key === workshopKey);
    if (item) setValue('department', item.departments.length === 0 ? '' : item.key);
    return item;
  }, [workshopKey, workshops, setValue]);

  const submit = async (data: FieldValues) => {
    console.log(data);
    setStatus({ sending: true, success: undefined });
    try {
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const responseData = await response.json();

      // if (!response.ok || !responseData.success) throw new Error();
      setTimeout(() => {
        setStatus({ sending: false, success: true });
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
          content={states}
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
          options={[...workshops.map(({ key, value }) => ({ key, value }))]}
          errors={errors}
          className={styles.radioGroup}
        />
        {workshop && workshop.departments.length > 0 && (
          <RadioGroup
            label='Wybierz dział'
            register={register('department', {
              required: { value: true, message: 'Dział jest wymagany' },
            })}
            options={[{ value: 'Ogólny', key: workshop.key }, ...workshop.departments]}
            errors={errors}
            className={styles.radioGroup}
          />
        )}
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
          type='tel'
          inputMode='numeric'
          label='Numer telefonu (opcjonalne)'
          placeholder='+48 ___ - ___ - ___'
          filled={!!watch('phone')}
          register={register('phone', {
            pattern: { value: REGEX.phone, message: 'Niepoprawny numer telefonu' },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value = formatPhoneNumber(e.target.value);
            },
          })}
          errors={errors}
        />
        <Input
          type='textarea'
          label='Temat (opcjonalne)'
          errors={errors}
          register={register('topic')}
          filled={!!watch('topic')}
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
