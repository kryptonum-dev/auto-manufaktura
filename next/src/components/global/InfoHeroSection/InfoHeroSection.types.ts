import type { PortableTextBlock } from 'next-sanity';
import type { ImgDataTypes } from '@/components/ui/Img';
import type { ButtonDataTypes } from '@/components/ui/Button';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';

export type InfoHeroSectionTypes = {
  index: number;
  breadcrumbs?: BreadcrumbsDataTypes;
  heading: PortableTextBlock[];
  content: PortableTextBlock[];
  image: ImgDataTypes;
  logo?: ImgDataTypes;
  cta: ButtonDataTypes;
};
