import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ButtonDataQuery } from '@/components/ui/Button';
import { MediaDataQuery } from '@/components/ui/Media';
import { ImgDataQuery } from '@/components/ui/Img';

import LogoSection from './LogoSection';
export default LogoSection;
export type { LogoSectionTypes } from './LogoSection.types';

export const LogoSectionQuery = `
  _type == "LogoSection" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('text')},
    ${ButtonDataQuery('cta')},
    ${ImgDataQuery('list[]')},
    ${MediaDataQuery('media')}
  },
`;
