import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ImgDataQuery } from '@/components/ui/Img';
import { FormStateQuery } from '@/components/ui/FormState';

import ApplicationForm from './ApplicationForm';
export default ApplicationForm;
export type { ApplicationFormDataTypes } from './ApplicationForm.types';

export const ApplicationFormQuery = `
  applicationForm {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('subheading')},
    ${PortableTextQuery('paragraph')},
    ${ImgDataQuery('images[]')},
    ${FormStateQuery('formStates')}
  }
`;
