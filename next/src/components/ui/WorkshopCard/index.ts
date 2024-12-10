import { ImgDataQuery } from '@/components/ui/Img';

import WorkshopCard from './WorkshopCard';
export default WorkshopCard;
export type { WorkshopCardTypes } from './WorkshopCard.types';

export const WorkshopCardQuery = `
  address {
    ${ImgDataQuery('mapImage')},
    city,
    street
  },
  openingHours[]{
    days,
    hours
  },
  googleData {
    placeId,
    rating,
    userRatingsTotal
  },
  hasDepartments,
  email, 
  tel,
  hasDepartments == true => {
    departments[]{
      name,
      fullName,
      email, 
      tel
    }
  }
`;
