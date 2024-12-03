import { FullCtaBoxQuery } from '@/components/ui/FullCtaBox';
import { ImgDataQuery } from '@/components/ui/Img';
import { PortableTextQuery } from '@/components/ui/TextBlock';

import CarBrandsList from './CarBrandsList';
export default CarBrandsList;
export type { CarBrandsListTypes } from './CarBrandsList.types';

export const CarBrandsListQuery = `
  _type == "CarBrandsList" => {
    ${PortableTextQuery('heading')},
    ${FullCtaBoxQuery('fullCtaBox')},
    "carBrands": *[_type == "CarBrand_Collection" && defined(slug.current)][] | order(_updatedAt desc){
      name,
      "slug": slug.current,
      ${ImgDataQuery('image')},
      ${ImgDataQuery('logo')}
    }
  },
`;
