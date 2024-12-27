import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ButtonDataQuery } from '@/components/ui/Button';
import { MediaDataQuery } from '@/components/ui/Media';

import MediaWithCenteredContentSection from './MediaWithCenteredContentSection';
export default MediaWithCenteredContentSection;
export type { MediaWithCenteredContentSectionTypes } from './MediaWithCenteredContentSection.types';

export const MediaWithCenteredContentSectionQuery = `
  _type == "MediaWithCenteredContentSection" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('text')},
    ${ButtonDataQuery('cta')},
    ${MediaDataQuery('media')}
  },
`;
