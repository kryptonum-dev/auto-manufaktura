import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ImgDataQuery } from '@/components/ui/Img';
import { ImageQuery } from './Image';
import { ListWithImagesQuery } from './ListWithImages';
import { QuoteQuery } from './Quote';

import Content from './Content';
export default Content;
export type { ContentTypes } from './Content.types';

export const ContentQuery = `
   ${ImgDataQuery('image')}, 
   author {
    ${ImgDataQuery('image')},
    name,
    text
  },
  "date": coalesce(publishedAt, _createdAt),
  content[]{
    _type == "block" => {
      ${PortableTextQuery()}
    },
    ${ImageQuery}
    ${ListWithImagesQuery}
    ${QuoteQuery}
  }
`;
