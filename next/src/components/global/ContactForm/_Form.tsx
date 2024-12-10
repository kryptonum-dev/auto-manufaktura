'use client';
import { useMemo, useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import Link from 'next/link';
import { REGEX } from '@/global/constants';
import { formatPhoneNumber } from '@/utils/format-phone-number';
import { ArrowRightIcon } from '@/components/icons';
import { FormTypes } from './ContactForm.types';
import { type FormStatusTypes } from '@/components/ui/FormState';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import styles from './ContactForm.module.scss';
import RadioGroup from '@/components/ui/RadioGroup';

export default function Form({ workshops }: FormTypes) {
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    handleSubmit,
    watch,
    register,
    setValue,
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

  const submit = (data: FieldValues) => {
    console.log(status);
    console.log(data);
    setStatus({ sending: true, success: undefined });
  };

  return (
    <div className={styles['Form']}>
      <form
        onSubmit={handleSubmit(submit)}
        noValidate
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

// 'use client';
// import { useState } from 'react';
// import { useForm, type FieldValues } from 'react-hook-form';
// import Link from 'next/link';
// import { REGEX } from '@/global/constants';
// import type { FormTypes } from './Faq.types';
// import FormState, { type FormStatusTypes } from '@/components/ui/FormState';
// import Input from '@/components/ui/Input';
// import Light from '@/components/ui/Light';
// import Checkbox from '@/components/ui/Checkbox';
// import Button from '@/components/ui/Button';
// import Loader from '@/components/ui/Loader';
// import styles from './Faq.module.scss';

// export default function Form({ states }: FormTypes) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     trigger,
//     formState: { errors },
//   } = useForm({
//     mode: 'onTouched',
//     defaultValues: { email: '', question: '', legal: false },
//   });

//   const submit = async (data: FieldValues) => {
//     console.log(data);
//     setStatus({ sending: true, success: undefined });
//     try {
//       // const response = await fetch('/api/faq', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(data),
//       // });
//       // const responseData = await response.json();

//       // if (!response.ok || !responseData.success) throw new Error();
//       setTimeout(() => {
//         setStatus({ sending: false, success: true });
//         reset();
//       }, 2000);
//     } catch {
//       setStatus({ sending: false, success: false });
//     } finally {
//       setCurrentStep(1);
//     }
//   };

//   const goToNextStep = async () => {
//     const isStepValid = await trigger('question');
//     if (isStepValid) setCurrentStep(2);
//   };

//   return (
//     <div className={styles['Form']}>
//       <Light
//         className={styles.light}
//         color={status.success !== undefined ? (status.success ? 'success' : 'error') : 'orange'}
//       />
//       <div className={styles.content}>
//         <Loader
//           loading={status.sending}
//           className={styles.loader}
//         />
//         <FormState
//           content={states}
//           success={status.success}
//           setStatus={setStatus}
//           className={styles.formState}
//         />
//         <form
//           onSubmit={handleSubmit(submit)}
//           noValidate
//           data-hidden={status.sending || status.success !== undefined}
//         >
//           {currentStep === 1 && (
//             <>
//               <Input
//                 type='textarea'
//                 label='Pytanie'
//                 errors={errors}
//                 register={register('question', {
//                   required: { value: true, message: 'Pytanie jest wymagane' },
//                   minLength: { value: 10, message: 'Pytanie musi mieć co najmniej 10 znaków' },
//                 })}
//                 filled={!!watch('question')}
//               />
//               <Button
//                 onClick={goToNextStep}
//                 text='Przejdź dalej'
//               />
//             </>
//           )}
//           {currentStep === 2 && (
//             <>
//               <Input
//                 type='email'
//                 label='E-mail'
//                 errors={errors}
//                 register={register('email', {
//                   required: { value: true, message: 'E-mail jest wymagany' },
//                   pattern: { value: REGEX.email, message: 'Niepoprawny adres e-mail' },
//                 })}
//                 filled={!!watch('email')}
//               />
//               <div className={styles.checkboxButton}>
//                 <Checkbox
//                   errors={errors}
//                   register={register('legal', {
//                     required: { value: true, message: 'Zgoda jest wymagana' },
//                   })}
//                 >
//                   Akceptuję{' '}
//                   <Link
//                     href='/polityka-prywatnosci'
//                     target='_blank'
//                     rel='noopener noreferrer'
//                     className='link'
//                   >
//                     politykę prywatności
//                   </Link>
//                   <ArrowIcon />
//                 </Checkbox>
//                 <Button
//                   text='Wyślij pytanie'
//                   type='submit'
//                 />
//               </div>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// const ArrowIcon = ({ ...props }) => (
//   <svg
//     xmlns='http://www.w3.org/2000/svg'
//     width={12}
//     height={12}
//     viewBox='0 0 12 12'
//     fill='none'
//     {...props}
//   >
//     <path
//       stroke='#CBD0D0'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//       d='m3 9 6-6m0 0H4.5M9 3v4.5'
//     />
//   </svg>
// );
