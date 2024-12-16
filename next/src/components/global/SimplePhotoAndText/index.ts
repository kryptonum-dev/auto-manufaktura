import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ImgDataQuery } from '@/components/ui/Img';
import { ButtonDataQuery } from '@/components/ui/Button';

import SimplePhotoAndText from './SimplePhotoAndText';
export default SimplePhotoAndText;
export type { SimplePhotoAndTextTypes } from './SimplePhotoAndText.types';

export const SimplePhotoAndTextQuery = `
  _type == "SimplePhotoAndText" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('content')},
    ${ImgDataQuery('image')},
    ${ButtonDataQuery('cta')},
    imagePosition
  },
`;
