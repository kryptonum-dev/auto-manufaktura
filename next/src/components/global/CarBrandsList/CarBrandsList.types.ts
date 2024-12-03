import type { PortableTextBlock } from 'next-sanity';
import type { FullCtaBoxTypes } from '@/components/ui/FullCtaBox';
import type { ImgDataTypes } from '@/components/ui/Img';

export type CarBrandsListTypes = {
  index: number;
  heading: PortableTextBlock[];
  fullCtaBox: FullCtaBoxTypes;
  carBrands: {
    logo: ImgDataTypes;
    image: ImgDataTypes;
    name: string;
    slug: string;
  }[];
};
