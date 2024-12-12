import { PortableTextQuery } from '@/components/ui/TextBlock';
import { JobAlertFormQuery } from '@/components/Career/JobAlertForm';

import Listing from './Listing';
import { JobsSectionQuery } from '../JobsSection';
export default Listing;
export type { ListingTypes } from './Listing.types';

export const ListingQuery = `
  ${PortableTextQuery('heading')},
  isHiring,
  isHiring == false => {
    ${JobAlertFormQuery('emailForm')}
  },
  isHiring == true => {
    "jobsContent": ${JobsSectionQuery}
  },
`;
