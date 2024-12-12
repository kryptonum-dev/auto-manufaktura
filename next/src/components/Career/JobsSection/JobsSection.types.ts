import type { ApplicationFormDataTypes } from '@/components/Career/ApplicationForm';
import type { InternshipOfferDataTypes } from '@/components/Career/InternshipOffer';
import type { JobOfferDataTypes } from '@/components/Career/JobsList';

export type JobsSectionTypes = {
  jobOffers?: JobOfferDataTypes[];
  hasInternshipOffer: boolean;
  internshipOffer?: InternshipOfferDataTypes;
  applicationForm: ApplicationFormDataTypes;
  workshops: { key: string; value: string }[];
  jobs?: { name: string; workshops: { key: string; value: string }[] }[];
};
