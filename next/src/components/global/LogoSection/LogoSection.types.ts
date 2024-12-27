import type { PortableTextBlock } from 'next-sanity';
import type { ButtonDataTypes } from '@/components/ui/Button';
import type { ImgDataTypes } from '@/components/ui/Img';
import type { MediaDataTypes } from '@/components/ui/Media';

export type LogoSectionTypes = {
  index: number;
  heading: PortableTextBlock[];
  text?: PortableTextBlock[];
  cta: ButtonDataTypes;
  media: MediaDataTypes;
  list: ImgDataTypes[];
};
