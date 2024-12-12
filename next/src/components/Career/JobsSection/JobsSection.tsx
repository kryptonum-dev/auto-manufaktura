'use client';
import { useState, useCallback, useRef } from 'react';
import JobsList from '@/components/Career/JobsList';
import InternshipOffer from '@/components/Career/InternshipOffer';
import ApplicationForm from '@/components/Career/ApplicationForm';
import type { JobsSectionTypes } from './JobsSection.types';
import styles from './JobsSection.module.scss';

export default function JobsSection({
  jobOffers,
  applicationForm,
  hasInternshipOffer,
  internshipOffer,
  workshops,
  jobs,
}: JobsSectionTypes) {
  jobs = jobs ?? [];

  const [application, setApplication] = useState<{ email: string; job: string }>({
    email: jobs.length === 0 ? workshops[0].key : jobs[0].workshops[0].key,
    job: jobs.length === 0 ? 'Praktykant' : jobs[0].name,
  });

  const formRef = useRef<HTMLDivElement>(null);

  const apply = useCallback(
    (job: string, email?: string) => {
      setApplication(prev => ({ job, email: email || prev.email }));
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [formRef]
  );

  return (
    <div className={styles['JobsSection']}>
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
        application={application}
        setApplication={setApplication}
        jobs={hasInternshipOffer ? [...jobs, { name: 'Praktykant', workshops }] : jobs}
        workshops={workshops}
      />
    </div>
  );
}
