import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ImgDataQuery } from '@/components/ui/Img';
import { ButtonDataQuery } from '@/components/ui/Button';

import InfoHeroSection from './InfoHeroSection';
export default InfoHeroSection;
export type { InfoHeroSectionTypes } from './InfoHeroSection.types';

export const InfoHeroSectionQuery = `
  _type == "InfoHeroSection" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('content')},
    ${ImgDataQuery('image')},
    ${ImgDataQuery('logo')},
    ${ButtonDataQuery('cta')}
  },
`;
