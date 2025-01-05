import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ImgDataQuery } from '@/components/ui/Img';

import JobsList from './JobsList';
export default JobsList;
export type { JobOfferDataTypes } from './JobsList.types';

export const JobOfferQuery = `
  jobOffers[]->{
    name,
    workshops[]->{
      "address": address.street,
      "city": address.city,
      email
    },
    ${PortableTextQuery('intro')},
    tags[]{
      ${ImgDataQuery('icon')},
      label
    },
    sections[]{
      ${PortableTextQuery('heading')},
      "list": ${PortableTextQuery('list[].text')}
    }
  }
`;
