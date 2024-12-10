import { PortableTextQuery } from '@/components/ui/TextBlock';

import FormState from './FormState';
export default FormState;
export type { FormStateTypes, FormStateDataTypes, FormStatusTypes } from './FormState.types';

export const FormStateQuery = (name: string) => /* groq */ `
  ${name} {
    success {
      ${PortableTextQuery('heading')},
      ${PortableTextQuery('paragraph')},
      ctaText
    },
    error {
      ${PortableTextQuery('heading')},
      ${PortableTextQuery('paragraph')},
      ctaText
    }
  }
`;
