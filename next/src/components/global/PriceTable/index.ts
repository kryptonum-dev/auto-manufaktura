import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ButtonDataQuery } from '@/components/ui/Button';

import PriceTable from './PriceTable';
export default PriceTable;
export type { PriceTableTypes } from './PriceTable.types';

export const PriceTableQuery = `
  _type == "PriceTable" => {
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('note')},
    priceDetails {
      work,
      parts,
      vat
    },
    ctaBox {
      ${PortableTextQuery('text')},
      ${ButtonDataQuery('cta')}
    }
  },
`;
