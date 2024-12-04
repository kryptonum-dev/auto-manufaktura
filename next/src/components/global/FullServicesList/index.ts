import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ServiceCardQuery } from '@/components/ui/ServiceCard';

import FullServicesList from './FullServicesList';
export default FullServicesList;
export type { FullServicesListTypes } from './FullServicesList.types';

export const FullServicesListQuery = `
  _type == "FullServicesList" => {
    ${PortableTextQuery('heading')},
    highlightedService {
      ${PortableTextQuery('heading')},
      label,
      service->{
        ${ServiceCardQuery}
      }
    },
    services[]->{
      ${ServiceCardQuery},
      "list": *[_type == "Service_Collection" && ^._id == parentPage._ref && ^.^.highlightedService.service->_id != _id] | order(_updatedAt desc) {
        ${ServiceCardQuery}
      }
    }
  },
`;
