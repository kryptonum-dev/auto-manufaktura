import type { PortableTextBlock } from 'next-sanity';
import type { ImgDataTypes } from '@/components/ui/Img';

export type JobOfferDataTypes = {
  name: string;
  workshops: { address: string; email: string }[];
  intro?: PortableTextBlock[];
  tags?: { icon: ImgDataTypes; label: string }[];
  sections?: {
    heading: PortableTextBlock[];
    list: string[];
  }[];
};

export type JobsListTypes = {
  jobOffers: JobOfferDataTypes[];
  workshops: { key: string; value: string }[];
  apply: (job: string, email?: string) => void;
};
