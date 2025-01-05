import { PortableTextQuery } from '@/components/ui/TextBlock';
import { JobAlertFormQuery } from '@/components/Career/JobAlertForm';
import { JobsSectionQuery } from '@/components/Career/JobsSection';

import Listing from './Listing';
export default Listing;
export type { ListingTypes } from './Listing.types';

export const ListingQuery = `
  ${PortableTextQuery('heading')},
  isHiring,
  isHiring == false => {
    ${JobAlertFormQuery}
  },
  isHiring == true => {
    "jobsContent": ${JobsSectionQuery}
  },
`;
