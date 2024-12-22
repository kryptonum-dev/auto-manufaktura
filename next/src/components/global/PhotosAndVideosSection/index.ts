import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ButtonDataQuery } from '@/components/ui/Button';
import { ImgDataQuery } from '@/components/ui/Img';

import PhotosAndVideosSection from './PhotosAndVideosSection';
export default PhotosAndVideosSection;
export type { PhotosAndVideosSectionTypes } from './PhotosAndVideosSection.types';

export const PhotosAndVideosSectionQuery = `
  _type == "PhotosAndVideosSection" => {
    sections[]{
      ${PortableTextQuery('heading')},
      ${PortableTextQuery('paragraph')},
      ${ButtonDataQuery('cta')},
      media[]{
        title,
        subtitle,
        ${ImgDataQuery('image')}
      }
    }
  },
`;
