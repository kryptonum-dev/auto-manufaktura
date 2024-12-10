'use client';
import { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { REGEX } from '@/global/constants';
import Input from '@/components/ui/Input';
import Light from '@/components/ui/Light';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import styles from './Faq.module.scss';
import Link from 'next/link';

type FormStatusTypes = {
  sending: boolean;
  success: boolean | undefined;
};

export default function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: { email: '', question: '', legal: false },
  });

  const submit = (data: FieldValues) => {
    console.log(data);
    setStatus({ sending: true, success: undefined });
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
        <form
          onSubmit={handleSubmit(submit)}
          noValidate
          data-hidden={status.sending || status.success !== undefined}
        >
          {currentStep === 1 && (
            <>
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
            </>
          )}
          {currentStep === 2 && (
            <>
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
                  <ArrowIcon />
                </Checkbox>
                <Button
                  text='Wyślij pytanie'
                  type='submit'
                />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

const ArrowIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={12}
    height={12}
    viewBox='0 0 12 12'
    fill='none'
    {...props}
  >
    <path
      stroke='#CBD0D0'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m3 9 6-6m0 0H4.5M9 3v4.5'
    />
  </svg>
);
