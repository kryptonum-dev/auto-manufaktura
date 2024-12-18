import { ImgDataQuery } from '@/components/ui/Img';
import Image from './Image';
export default Image;
export type { ImageTypes } from './Image.types';

export const ImageQuery = `
  _type == "Image" => {
    _type,
    ${ImgDataQuery('image')},
    text
  },
`;
