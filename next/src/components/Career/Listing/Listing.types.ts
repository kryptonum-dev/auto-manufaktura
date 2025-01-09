import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { JobAlertFormTypes } from '@/components/Career/JobAlertForm';
import type { JobsSectionTypes } from '@/components/Career/JobsSection';

export type ListingTypes = {
  breadcrumbs: BreadcrumbsDataTypes;
  heading: PortableTextBlock[];
  isHiring: boolean;
  groupId?: string;
  emailForm?: JobAlertFormTypes;
  jobsContent?: JobsSectionTypes;
};
