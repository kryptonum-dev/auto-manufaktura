import type { PortableTextBlock } from 'next-sanity';
import type { ImgDataTypes } from '@/components/ui/Img';
import type { ReadingTimeContentTypes } from '@/components/ui/ReadingTime';

export type ContentTypes = {
  image: ImgDataTypes;
  author?: {
    image: ImgDataTypes;
    name: string;
    text?: string;
  };
  date: string;
  content: PortableTextBlock[];
  readingTimeContent: ReadingTimeContentTypes;
};
