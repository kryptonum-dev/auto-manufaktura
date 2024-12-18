import type { ImgDataTypes } from '@/components/ui/Img';
import type { PortableTextBlock } from 'next-sanity';

export type ListWithImagesTypes = {
  list: {
    image: ImgDataTypes;
    heading: PortableTextBlock[];
    paragraph?: PortableTextBlock[];
  }[];
};
