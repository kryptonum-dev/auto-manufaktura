import { PortableTextQuery } from '@/components/ui/TextBlock';
import { WorkshopCardQuery } from '@/components/ui/WorkshopCard';
import { FormStateQuery } from '@/components/ui/FormState';

import ContactForm from './ContactForm';
export default ContactForm;
export type { ContactFormTypes } from './ContactForm.types';

export const ContactFormQuery = `
  _type == "ContactForm" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('text')},
    "workshops": select(
      defined(workshops) && count(workshops) > 0 => workshops[]->{
        ${WorkshopCardQuery}
      },
      *[_type == "Workshop_Collection"][] | order(_updatedAt desc){
        ${WorkshopCardQuery}
      }
    ),
    ${FormStateQuery('formStates')}
  },
`;
