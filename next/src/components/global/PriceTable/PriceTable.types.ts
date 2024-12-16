import type { PortableTextBlock } from 'next-sanity';
import type { ButtonDataTypes } from '@/components/ui/Button';

export type PriceTableTypes = {
  index: number;
  heading: PortableTextBlock[];
  note: PortableTextBlock[];
  priceDetails: {
    work: number;
    parts?: number;
    vat: number;
  };
  ctaBox: {
    text: PortableTextBlock[];
    cta: ButtonDataTypes;
  };
};
