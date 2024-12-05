import type { PortableTextBlock } from 'next-sanity';

export type ReviewsTypes = {
  index: number;
  heading: PortableTextBlock[];
  reviews: {
    username: string;
    date?: string;
    review: PortableTextBlock[];
    rating: number;
  }[];
  workshops: {
    street: string;
    city: string;
    googleData: {
      placeId: string;
      userRatingsTotal: number;
      rating: number;
    };
  }[];
};
