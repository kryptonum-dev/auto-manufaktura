import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';

export type PrivacyPolicySectionTypes = {
  heading: PortableTextBlock[];
  paragraph?: PortableTextBlock[];
  list: {
    heading: PortableTextBlock[];
    text: PortableTextBlock[];
  }[];
  breadcrumbs?: BreadcrumbsDataTypes;
};
