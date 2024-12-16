import type { PortableTextBlock } from 'next-sanity';
import type { FormStateContentTypes } from '@/components/ui/FormState';

export type FaqTypes = {
  index: number;
  heading: PortableTextBlock[];
  paragraph?: PortableTextBlock[];
  list: {
    question: PortableTextBlock[];
    answer: PortableTextBlock[];
  }[];
};

export type AccordionListTypes = {
  list: {
    question: React.ReactNode;
    answer: React.ReactNode;
  }[];
};

export type FormTypes = {
  states: FormStateContentTypes;
};
