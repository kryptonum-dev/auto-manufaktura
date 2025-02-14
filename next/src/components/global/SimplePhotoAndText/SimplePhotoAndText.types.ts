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
  contact?: {
    type: 'department' | 'workshop';
    address?: string;
    url?: string;
    fullName?: string;
    email: string;
    tel: string;
  }[];
};
