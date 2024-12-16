import type { PortableTextBlock } from 'next-sanity';
import type { ButtonDataTypes } from '@/components/ui/Button';
import type { ImgDataTypes } from '@/components/ui/Img';

export type FeaturesSectionTypes = {
  index: number;
  heading: PortableTextBlock[];
  features: { text: PortableTextBlock[] }[];
  ctaBox: {
    text: PortableTextBlock[];
    cta: ButtonDataTypes;
    image: ImgDataTypes;
  };
};

export type ListTypes = {
  elements: React.ReactNode[];
  Icon: React.ReactNode;
};
