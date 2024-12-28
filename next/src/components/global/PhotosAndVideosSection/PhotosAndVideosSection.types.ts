import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { ButtonDataTypes } from '@/components/ui/Button';
import type { ImgDataTypes } from '@/components/ui/Img';
import type { VideoDataTypes } from '@/components/ui/Video';

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
      video?: VideoDataTypes;
    }[];
  }[];
};

export type VideoModalTypes = {
  video: VideoDataTypes;
  setVideo: React.Dispatch<React.SetStateAction<VideoDataTypes | null>>;
  closeIcon: React.ReactNode;
};
