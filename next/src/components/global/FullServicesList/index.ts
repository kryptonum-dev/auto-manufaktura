import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ServiceCardQuery } from '@/components/ui/ServiceCard';

import FullServicesList from './FullServicesList';
export default FullServicesList;
export type { FullServicesListTypes } from './FullServicesList.types';

export const FullServicesListQuery = `
  _type == "FullServicesList" => {
    ${PortableTextQuery('heading')},
    "highlightedService": *[_type == "Service_Collection" && isHighlighted][0] {
      ${PortableTextQuery('highlightedHeading')},
      "label": highlightedLabel,
      "service": {
        ${ServiceCardQuery}
      }
    },
    "services": select(services != null => 
      services[]->{
        ${ServiceCardQuery},
        "list": *[_type == "Service_Collection" && ^._id == parentPage._ref && !isHighlighted] | order(_createdAt asc) {
          ${ServiceCardQuery}
        }
      },
      *[_type == "Service_Collection" && !isSubPage] | order(_createdAt asc) [0...2] {
        ${ServiceCardQuery},
        "list": *[_type == "Service_Collection" && ^._id == parentPage._ref && !isHighlighted] | order(_createdAt asc) {
          ${ServiceCardQuery}
        }
      }
    )
  },
`;
