import { PortableTextQuery } from '@/components/ui/TextBlock';
import PrivacyPolicySection from './PrivacyPolicySection';
export default PrivacyPolicySection;
export type { PrivacyPolicySectionTypes } from './PrivacyPolicySection.types';

export const PrivacyPolicySectionQuery = `
  ${PortableTextQuery('heading')},
  ${PortableTextQuery('paragraph')},
  content[]{
    _type == "block" => {
      ${PortableTextQuery()}
    },
  }
`;
