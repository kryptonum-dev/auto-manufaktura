import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { FullCtaBoxTypes } from '@/components/ui/FullCtaBox';

export type PricesTypes = {
  index: number;
  breadcrumbs?: BreadcrumbsDataTypes;
  heading: PortableTextBlock[];
  paragraph?: PortableTextBlock[];
  additionalInfo?: PortableTextBlock[];
  fullCtaBox: FullCtaBoxTypes;
  section: {
    heading: PortableTextBlock[];
    list: PricesCardTypes[];
  }[];
};

export type PricesCardTypes = {
  heading: PortableTextBlock[];
  highlightedLabel?: string;
  prices: {
    name: PortableTextBlock[];
    price: PortableTextBlock[];
  }[];
};
