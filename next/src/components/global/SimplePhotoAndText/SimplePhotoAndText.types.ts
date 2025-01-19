import type { ButtonDataTypes } from '@/components/ui/Button';
import type { ImgDataTypes } from '@/components/ui/Img';
import type { PortableTextBlock } from 'next-sanity';

export type SimplePhotoAndTextTypes = {
  index: number;
  heading?: PortableTextBlock[];
  content: PortableTextBlock[];
  image: ImgDataTypes;
  cta: ButtonDataTypes;
  imagePosition: 'left' | 'right';
  contact:
    | {
        type: 'department';
        address?: never;
        url?: never;
        email: string;
        tel: string;
        fullName: string;
      }
    | {
        type: 'workshop';
        address: string;
        url: string;
        email: string;
        tel: string;
        fullName?: never;
      };
};
