import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ButtonDataQuery } from '@/components/ui/Button';
import { ImgDataQuery } from '@/components/ui/Img';

import FeaturesSection from './FeaturesSection';
export default FeaturesSection;
export type { FeaturesSectionTypes } from './FeaturesSection.types';

export const FeaturesSectionQuery = `
  _type == "FeaturesSection" => {
    ${PortableTextQuery('heading')},
    features[]{
      ${PortableTextQuery('text')}
    },
    ctaBox {
      ${PortableTextQuery('text')},
      ${ButtonDataQuery('cta')},
      ${ImgDataQuery('image')}
    }
  },
`;
