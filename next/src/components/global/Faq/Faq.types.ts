import type { PortableTextBlock } from 'next-sanity';

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
