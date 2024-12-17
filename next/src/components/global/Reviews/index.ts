import { PortableTextQuery } from '@/components/ui/TextBlock';

import Reviews from './Reviews';
export default Reviews;
export type { ReviewsTypes } from './Reviews.types';

const ReviewQuery = `
  username,
  date,
  ${PortableTextQuery('review')},
  rating
`;

export const ReviewsQuery = `
  _type == "Reviews" => {
    ${PortableTextQuery('heading')},
    "reviews": select(
      defined(reviews) && count(reviews) > 0 => reviews[]->{
        ${ReviewQuery}
      },
      *[_type == "Review_Collection"][] | order(_updatedAt desc) {
        ${ReviewQuery}
      }
    ),
    "workshops": *[_type == "Workshop_Collection"] | order(_updatedAt desc) {
      "city": address.city,
      "street": address.street,  
      googleData {
        url,
        userRatingsTotal,
        rating
      }
    }
  },
`;
