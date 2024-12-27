import type { PortableTextBlock } from 'next-sanity';
import type { MediaDataTypes } from '@/components/ui/Media';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { ButtonDataTypes } from '@/components/ui/Button';

export type MediaHeroSectionTypes = {
  index: number;
  breadcrumbs?: BreadcrumbsDataTypes;
  heading: PortableTextBlock[];
  cta: ButtonDataTypes;
  variant: 'with-text' | 'with-points';
  text?: PortableTextBlock[];
  points?: { text: PortableTextBlock[] }[];
  media: MediaDataTypes;
  lightEffect: boolean;
};
