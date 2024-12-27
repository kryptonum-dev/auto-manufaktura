import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { ButtonDataTypes } from '@/components/ui/Button';
import type { MediaDataTypes } from '@/components/ui/Media';

export type MediaWithCenteredContentSectionTypes = {
  index: number;
  breadcrumbs?: BreadcrumbsDataTypes;
  heading: PortableTextBlock[];
  text: PortableTextBlock[];
  cta: ButtonDataTypes;
  media: MediaDataTypes;
};
