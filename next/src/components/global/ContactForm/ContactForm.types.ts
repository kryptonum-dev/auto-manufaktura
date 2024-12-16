import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { WorkshopCardTypes } from '@/components/ui/WorkshopCard';
import type { FormStateDataTypes, FormStateContentTypes } from '@/components/ui/FormState';

export type ContactFormTypes = {
  index: number;
  breadcrumbs?: BreadcrumbsDataTypes;
  heading: PortableTextBlock[];
  text?: PortableTextBlock[];
  workshops: WorkshopCardTypes[];
  formStates: FormStateDataTypes;
};

export type FormTypes = {
  workshops: {
    value: string;
    key: string;
    departments: { value: string; key: string }[];
  }[];
  states: FormStateContentTypes;
};
