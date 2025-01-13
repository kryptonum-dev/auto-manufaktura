import dynamic from 'next/dynamic';
import TextBlock from '@/components/ui/TextBlock';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { ListingTypes } from './Listing.types';
import styles from './Listing.module.scss';

const JobAlertForm = dynamic(() => import('@/components/Career/JobAlertForm'), { ssr: false });
const JobsSection = dynamic(() => import('@/components/Career/JobsSection'), { ssr: false });

export default function Listing({ heading, breadcrumbs, isHiring, emailForm, groupId, jobsContent }: ListingTypes) {
  return (
    <>
      <section className={`${styles['Listing']} max-width`}>
        <Breadcrumbs data={breadcrumbs} />
        <header>
          <TextBlock
            tag='h1'
            className='heading-2xl'
            value={heading}
          />
        </header>
        {!isHiring && emailForm && (
          <JobAlertForm
            {...emailForm}
            groupId={groupId}
          />
        )}
        {isHiring && jobsContent && <JobsSection {...jobsContent} />}
      </section>
    </>
  );
}
