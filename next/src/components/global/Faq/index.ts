import { PortableTextQuery } from '@/components/ui/TextBlock';
import { FormStateQuery } from '@/components/ui/FormState';

import Faq from './Faq';
export default Faq;
export type { FaqTypes } from './Faq.types';

export const FaqQuery = `
  _type == "Faq" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('paragraph')},
    list[]->{
      ${PortableTextQuery('question')},
      ${PortableTextQuery('answer')}
    },
    ${FormStateQuery('formStates')}
  },
`;
