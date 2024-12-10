import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsTypes } from '@/components/ui/Breadcrumbs';
import type { WorkshopCardTypes } from '@/components/ui/WorkshopCard';

export type ContactFormTypes = {
  index: number;
  breadcrumbs?: BreadcrumbsTypes;
  heading: PortableTextBlock[];
  text?: PortableTextBlock[];
  workshops: WorkshopCardTypes[];
};

export type FormTypes = {
  workshops: {
    value: string;
    key: string;
    departments: { value: string; key: string }[];
  }[];
};
