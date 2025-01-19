import type { ImgDataTypes } from '@/components/ui/Img';

export type WorkshopCardTypes = {
  address: {
    mapImage: ImgDataTypes;
    city: string;
    street: string;
  };
  openingHours: {
    days: string;
    hours: string;
  }[];
  googleData: {
    url: string;
    rating: number;
    userRatingsTotal: number;
  };
  tel: string;
  email: string;
  departments?: {
    name: string;
    fullName: string;
    tel: string;
    email: string;
  }[];
  imgPriority?: boolean;
};
