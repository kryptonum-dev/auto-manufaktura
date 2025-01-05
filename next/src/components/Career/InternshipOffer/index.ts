import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ImgDataQuery } from '@/components/ui/Img';

import InternshipOffer from './InternshipOffer';
export default InternshipOffer;
export type { InternshipOfferDataTypes } from './InternshipOffer.types';

export const InternshipOfferQuery = `
  internshipOffer {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('paragraph')},
    ${ImgDataQuery('image')}
  }
`;
