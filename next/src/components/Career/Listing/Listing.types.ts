import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsTypes } from '@/components/ui/Breadcrumbs';
import type { JobAlertFormTypes } from '@/components/Career/JobAlertForm';

export type ListingTypes = {
  breadcrumbs: BreadcrumbsTypes;
  heading: PortableTextBlock[];
  isHiring: boolean;
  emailForm?: JobAlertFormTypes;
};
