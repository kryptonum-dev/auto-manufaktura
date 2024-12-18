import type { PortableTextBlock } from 'next-sanity';

export type QuoteTypes = {
  text: PortableTextBlock[];
  author?: string;
};
