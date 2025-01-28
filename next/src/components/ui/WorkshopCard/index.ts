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
    url,
    rating,
    userRatingsTotal
  },
  email, 
  tel,
  "departments": *[_type == "Workshop_Collection" && type == "department" && workshop._ref == ^._id] | order(_createdAt asc){
    fullName,
    name,
    email,
    tel
  }
`;
