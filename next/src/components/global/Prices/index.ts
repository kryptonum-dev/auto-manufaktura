import { PortableTextQuery } from '@/components/ui/TextBlock';
import { FullCtaBoxQuery } from '@/components/ui/FullCtaBox';

import Prices from './Prices';
export default Prices;
export type { PricesTypes } from './Prices.types';

export const PricesQuery = `
  _type == "Prices" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('paragraph')},
    ${PortableTextQuery('additionalInfo')},
    ${FullCtaBoxQuery('fullCtaBox')},
    section[]{
      ${PortableTextQuery('heading')},
      list[] | order(isHighlighted desc) {
        highlightedLabel,
        ${PortableTextQuery('heading')},
        prices[]{
          ${PortableTextQuery('name')},
          ${PortableTextQuery('price')}
        }
      }
    }
  },
`;
