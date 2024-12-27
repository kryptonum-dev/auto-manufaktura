import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ImgDataQuery } from '@/components/ui/Img';
import { MediaDataQuery } from '@/components/ui/Media';

import TimelineSection from './TimelineSection';
export default TimelineSection;
export type { TimelineSectionTypes } from './TimelineSection.types';

export const TimelineSectionQuery = `
  _type == "TimelineSection" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('text')},
    ${ImgDataQuery('headerImage')},
    ${MediaDataQuery('media')},
    timeline[]{
      label,
      ${PortableTextQuery('text')}
    }
  },
`;
