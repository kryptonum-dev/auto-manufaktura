import TextBlock from '@/components/ui/TextBlock';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JobAlertForm from '@/components/Career/JobAlertForm';
import JobsSection from '@/components/Career/JobsSection';
import type { ListingTypes } from './Listing.types';
import styles from './Listing.module.scss';

export default function Listing({ heading, breadcrumbs, isHiring, emailForm, jobsContent }: ListingTypes) {
  return (
    <section className={`${styles['Listing']} max-width`}>
      <Breadcrumbs {...breadcrumbs} />
      <header>
        <TextBlock
          tag='h1'
          className='heading-2xl'
          value={heading}
        />
      </header>
      {!isHiring && emailForm && <JobAlertForm {...emailForm} />}
      {isHiring && jobsContent && <JobsSection {...jobsContent} />}
    </section>
  );
}
