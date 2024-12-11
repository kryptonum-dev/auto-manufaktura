import type { PortableTextBlock } from 'next-sanity';
import type { FormStateDataTypes } from '@/components/ui/FormState';

export type JobAlertFormTypes = {
  heading: PortableTextBlock[];
  paragraph: PortableTextBlock[];
  formStates: FormStateDataTypes;
};

export type FormTypes = {
  states: FormStateDataTypes;
};
