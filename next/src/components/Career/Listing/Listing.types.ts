import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsTypes } from '@/components/ui/Breadcrumbs';
import type { JobAlertFormTypes } from '@/components/Career/JobAlertForm';
import type { JobsSectionTypes } from '@/components/Career/JobsSection';

export type ListingTypes = {
  breadcrumbs: BreadcrumbsTypes;
  heading: PortableTextBlock[];
  isHiring: boolean;
  emailForm?: JobAlertFormTypes;
  jobsContent?: JobsSectionTypes;
};
