import type { PortableTextBlock } from 'next-sanity';
import type { ImgDataTypes } from '@/components/ui/Img';

export type InternshipOfferDataTypes = {
  heading: PortableTextBlock[];
  paragraph?: PortableTextBlock[];
  image: ImgDataTypes;
};

export type InternshipOfferTypes = InternshipOfferDataTypes & {
  apply: (job: string, email?: string) => void;
};
