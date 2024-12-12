import { JobOfferQuery } from '@/components/Career/JobsList';
import { InternshipOfferQuery } from '@/components/Career/InternshipOffer';
import { ApplicationFormQuery } from '@/components/Career/ApplicationForm';

import JobsSection from './JobsSection';
export default JobsSection;
export type { JobsSectionTypes } from './JobsSection.types';

export const JobsSectionQuery = `
  {
    ${JobOfferQuery('jobOffers[]->')},
    hasInternshipOffer,
    hasInternshipOffer == true => {  
      ${InternshipOfferQuery('internshipOffer')}
    },
    ${ApplicationFormQuery('applicationForm')},
    "workshops": select(
      hasInternshipOffer == false => *[_type == "Workshop_Collection" && _id in ^.jobOffers[]->workshops[]._ref][]{
        "key": email,
        "value": address.street
      },
      *[_type == "Workshop_Collection"][]{
        "key": email,
        "value": address.street
      }
    ),
    "jobs": jobOffers[]->{
      name,
      workshops[]->{
        "key": email,
        "value": address.street
      }
    }
  }
`;
