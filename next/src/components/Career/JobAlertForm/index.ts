import { PortableTextQuery } from '@/components/ui/TextBlock';
import { FormStateQuery } from '@/components/ui/FormState';
import JobAlertForm from './JobAlertForm';
export default JobAlertForm;
export type { JobAlertFormTypes } from './JobAlertForm.types';

export const JobAlertFormQuery = (name: string) => /* groq */ `
  ${name} {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('paragraph')},
    ${FormStateQuery('formStates')}
  }
`;
