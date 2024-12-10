import type { PortableTextBlock } from 'next-sanity';
import type { FormStateDataTypes } from '@/components/ui/FormState';

export type FaqTypes = {
  index: number;
  heading: PortableTextBlock[];
  paragraph?: PortableTextBlock[];
  list: {
    question: PortableTextBlock[];
    answer: PortableTextBlock[];
  }[];
  formStates: FormStateDataTypes;
};

export type AccordionListTypes = {
  list: {
    question: React.ReactNode;
    answer: React.ReactNode;
  }[];
};

export type FormTypes = {
  states: FormStateDataTypes;
};
