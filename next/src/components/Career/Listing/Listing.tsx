import TextBlock from '@/components/ui/TextBlock';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JobAlertForm from '../JobAlertForm';
import JobsSection from '../JobsSection';
import type { ListingTypes } from './Listing.types';
import styles from './Listing.module.scss';

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
