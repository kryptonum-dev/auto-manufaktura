import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ButtonDataQuery } from '@/components/ui/Button';
import { MediaDataQuery } from '@/components/ui/Media';

import MediaHeroSection from './MediaHeroSection';
export default MediaHeroSection;
export type { MediaHeroSectionTypes } from './MediaHeroSection.types';

export const MediaHeroSectionQuery = `
  _type == "MediaHeroSection" => {
    ${PortableTextQuery('heading')},
    ${ButtonDataQuery('cta')},
    variant,
    ${PortableTextQuery('text')},
    points[]{
      ${PortableTextQuery('text')}
    },
    ${MediaDataQuery('media')},
    lightEffect
  },
`;
