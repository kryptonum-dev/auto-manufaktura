import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ServiceCardQuery } from '@/components/ui/ServiceCard';

import SelectedServicesList from './SelectedServicesList';
export default SelectedServicesList;
export type { SelectedServicesListTypes } from './SelectedServicesList.types';

export const SelectedServicesListQuery = `
  _type == "SelectedServicesList" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('paragraph')},
    services[]->{
      ${ServiceCardQuery},
      isHighlighted => {
        "label": highlightedLabel
      }
    }
  },
`;
