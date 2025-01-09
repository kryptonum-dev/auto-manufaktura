import type { PortableTextBlock } from 'next-sanity';
import type { FormStateDataTypes, FormStateContentTypes } from '@/components/ui/FormState';

export type JobAlertFormTypes = {
  heading: PortableTextBlock[];
  paragraph: PortableTextBlock[];
  formStates: FormStateDataTypes;
  groupId?: string;
};

export type FormTypes = {
  states: FormStateContentTypes;
  groupId?: string;
};
