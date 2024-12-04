import { ImgDataQuery } from '@/components/ui/Img';

import ServiceCard from './ServiceCard';
export default ServiceCard;
export type { ServiceCardTypes, ServiceTypes } from './ServiceCard.types';

export const ServiceCardQuery = `
  name,
  ${ImgDataQuery('image')},
  "slug": slug.current,
  tags
`;
