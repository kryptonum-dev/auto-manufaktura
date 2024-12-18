import type { ReadingTimeContentTypes } from '@/components/ui/ReadingTime';
import type { ImgDataTypes } from '@/components/ui/Img';

export type BlogPostCardTypes = {
  name: string;
  path: string;
  image: ImgDataTypes;
  date: string;
  imagePriority?: boolean;
  readingTimeContent: ReadingTimeContentTypes;
};
