import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ButtonDataQuery } from '@/components/ui/Button';

import FullCtaBox from './FullCtaBox';
export default FullCtaBox;
export type { FullCtaBoxTypes } from './FullCtaBox.types';

export const FullCtaBoxQuery = (name: string) => /* groq */ `
  ${name} {
    ${PortableTextQuery('mainText')},
    ${PortableTextQuery('secondaryText')},
    ${ButtonDataQuery('cta')}
  }
`;
