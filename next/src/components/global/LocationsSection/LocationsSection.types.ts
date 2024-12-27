import type { PortableTextBlock } from 'next-sanity';
import type { MediaDataTypes } from '@/components/ui/Media';

export type LocationsSectionTypes = {
  index: number;
  heading: PortableTextBlock[];
  text?: PortableTextBlock[];
  media: MediaDataTypes;
  locations: { name: string; path: string }[];
};
