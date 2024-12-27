import type { PortableTextBlock } from 'next-sanity';
import type { ImgDataTypes } from '@/components/ui/Img';
import type { MediaDataTypes } from '@/components/ui/Media';

export type TimelineSectionTypes = {
  index: number;
  heading: PortableTextBlock[];
  text?: PortableTextBlock[];
  headerImage: ImgDataTypes;
  media: MediaDataTypes;
  timeline: {
    label: string;
    text: PortableTextBlock[];
  }[];
};
