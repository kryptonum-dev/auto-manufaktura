'use client';
import { useCallback, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import JobsList from '@/components/Career/JobsList';
import InternshipOffer from '@/components/Career/InternshipOffer';
import ApplicationForm from '@/components/Career/ApplicationForm';
import type { FileTypes } from '@/components/ui/FilesInput';
import type { JobsSectionTypes } from './JobsSection.types';
import styles from './JobsSection.module.scss';

export default function JobsSection({
  jobOffers,
  applicationForm,
  hasInternshipOffer,
  internshipOffer,
  workshops,
}: JobsSectionTypes) {
  const data = workshops.map(workshop => {
    const jobs = (jobOffers ?? [])
      .filter(offer => offer.workshops.some(w => w.email === workshop.email))
      .map(({ name }) => name);

    if (hasInternshipOffer) jobs.push('Praktykant');

    return { ...workshop, jobs };
  });

  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      workshop: data[0].email,
      job: data[0].jobs[0],
      files: [] as FileTypes[],
    },
  });

  const { setValue } = methods;
  const formRef = useRef<HTMLDivElement>(null);

  const apply = useCallback(
    (job: string, email?: string) => {
      setValue('workshop', email || workshops[0].email);
      setValue('job', job);
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [setValue, workshops]
  );

  return (
    <div className={styles['JobsSection']}>
      <FormProvider {...methods}>
        {jobOffers && jobOffers.length > 0 && (
          <JobsList
            workshops={workshops}
            jobOffers={jobOffers}
            apply={apply}
          />
        )}
        {hasInternshipOffer && internshipOffer && (
          <InternshipOffer
            {...internshipOffer}
            apply={apply}
          />
        )}
        <ApplicationForm
          {...applicationForm}
          ref={formRef}
          workshops={data}
        />
      </FormProvider>
    </div>
  );
}
