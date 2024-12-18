import { ImgDataQuery } from '@/components/ui/Img';
import { PortableTextQuery } from '@/components/ui/TextBlock';

import ListWithImages from './ListWithImages';
export default ListWithImages;
export type { ListWithImagesTypes } from './ListWithImages.types';

export const ListWithImagesQuery = `
  _type == "ListWithImages" => {
    _type,
    list[]{
      ${ImgDataQuery('image')},
      ${PortableTextQuery('heading')},
      ${PortableTextQuery('paragraph')}
    }
  },
`;
