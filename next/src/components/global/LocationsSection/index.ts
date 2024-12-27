import { PortableTextQuery } from '@/components/ui/TextBlock';
import { MediaDataQuery } from '@/components/ui/Media';

import LocationsSection from './LocationsSection';
export default LocationsSection;
export type { LocationsSectionTypes } from './LocationsSection.types';

export const LocationsSectionQuery = `
  _type == "LocationsSection" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('text')},
    ${MediaDataQuery('media')},
    "locations": select(locations != null =>
      locations[]->{
        name,
        "path": slug.current
      },
      *[_type == 'Location_Collection'] | order(_createdAt asc){
        name,
        "path": slug.current
      }
    )
  },
`;
