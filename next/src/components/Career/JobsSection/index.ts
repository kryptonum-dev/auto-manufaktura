import { JobOfferQuery } from '@/components/Career/JobsList';
import { InternshipOfferQuery } from '@/components/Career/InternshipOffer';
import { ApplicationFormQuery } from '@/components/Career/ApplicationForm';

import JobsSection from './JobsSection';
export default JobsSection;
export type { JobsSectionTypes } from './JobsSection.types';

export const JobsSectionQuery = `
  {
    ${JobOfferQuery},
    hasInternshipOffer,
    hasInternshipOffer == true => {  
      ${InternshipOfferQuery}
    },
    ${ApplicationFormQuery},
    "workshops": select(
      hasInternshipOffer == false => *[_type == "Workshop_Collection" && type == "workshop" && _id in ^.jobOffers[]->workshops[]._ref][]{
        email,
        "address": address.street
      },
      *[_type == "Workshop_Collection" && type == "workshop"][]{
        email,
        "address": address.street
      }
    )
  }
`;
