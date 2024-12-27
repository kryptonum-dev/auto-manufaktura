import { PortableTextQuery } from '@/components/ui/TextBlock';
import { FullCtaBoxQuery } from '@/components/ui/FullCtaBox';
import { ButtonDataQuery } from '@/components/ui/Button';
import { MediaDataQuery } from '@/components/ui/Media';

import FourStepsSection from './FourStepsSection';
export default FourStepsSection;
export type { FourStepsSectionTypes } from './FourStepsSection.types';

export const FourStepsSectionQuery = `
  _type == "FourStepsSection" => {
    ${PortableTextQuery('heading')},
    ${FullCtaBoxQuery('fullCtaBox')},
    ${MediaDataQuery('media')},
    steps[] {
      ${PortableTextQuery('text')},
      ${ButtonDataQuery('cta')}
    }
  },
`;
