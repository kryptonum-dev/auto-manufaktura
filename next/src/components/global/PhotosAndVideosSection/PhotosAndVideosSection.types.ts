import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { ButtonDataTypes } from '@/components/ui/Button';
import type { ImgDataTypes } from '@/components/ui/Img';

export type PhotosAndVideosSectionTypes = {
  index: number;
  breadcrumbs?: BreadcrumbsDataTypes;
  sections: {
    heading: PortableTextBlock[];
    paragraph?: PortableTextBlock[];
    cta?: ButtonDataTypes;
    media: {
      title: string;
      subtitle?: string;
      image: ImgDataTypes;
    }[];
  }[];
};
