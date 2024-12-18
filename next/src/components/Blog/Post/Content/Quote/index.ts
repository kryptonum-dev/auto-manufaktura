import { PortableTextQuery } from '@/components/ui/TextBlock';

import Quote from './Quote';
export default Quote;
export type { QuoteTypes } from './Quote.types';

export const QuoteQuery = `
  _type == "Quote" => {
    _type,
    ${PortableTextQuery('text')},
    author
  },
`;
