'use client';
import { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import Link from 'next/link';
import { REGEX } from '@/global/constants';
import { ArrowRightIcon } from '@/components/icons';
import FormState, { type FormStatusTypes } from '@/components/ui/FormState';
import Input from '@/components/ui/Input';
import Light from '@/components/ui/Light';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import type { FormTypes } from './Faq.types';
import styles from './Faq.module.scss';

export default function Form({ states }: FormTypes) {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: { email: '', question: '', legal: false },
  });

  const submit = async (data: FieldValues) => {
    console.log(data);
    setStatus({ sending: true, success: undefined });
    try {
      // const response = await fetch('/api/faq', {
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
    } finally {
      setCurrentStep(1);
    }
  };

  const goToNextStep = async () => {
    const isStepValid = await trigger('question');
    if (isStepValid) setCurrentStep(2);
  };

  return (
    <div className={styles['Form']}>
      <Light
        className={styles.light}
        color={status.success !== undefined ? (status.success ? 'success' : 'error') : 'orange'}
      />
      <div className={styles.content}>
        <Loader
          loading={status.sending}
          className={styles.loader}
        />
        <FormState
          content={states}
          success={status.success}
          setStatus={setStatus}
          className={styles.formState}
        />
        <form
          onSubmit={handleSubmit(submit)}
          noValidate
          data-hidden={status.sending || status.success !== undefined}
        >
          {currentStep === 1 && (
            <div className={styles.step}>
              <Input
                type='textarea'
                label='Pytanie'
                errors={errors}
                register={register('question', {
                  required: { value: true, message: 'Pytanie jest wymagane' },
                  minLength: { value: 10, message: 'Pytanie musi mieć co najmniej 10 znaków' },
                })}
                filled={!!watch('question')}
              />
              <Button
                onClick={goToNextStep}
                text='Przejdź dalej'
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className={styles.step}>
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
              <div className={styles.checkboxButton}>
                <Checkbox
                  errors={errors}
                  register={register('legal', {
                    required: { value: true, message: 'Zgoda jest wymagana' },
                  })}
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
                  text='Wyślij pytanie'
                  type='submit'
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
