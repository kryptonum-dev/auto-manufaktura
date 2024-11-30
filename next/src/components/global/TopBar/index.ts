import { PortableTextQuery } from '@/components/ui/TextBlock';

import TopBar from './TopBar';
export default TopBar;
export type { TopBarTypes } from './TopBar.types';

export const TopBarQuery = /* groq */ `
  *[_id == "global"][0].topBar {
    ${PortableTextQuery('annotation')},
    additionalContact {
      name, 
      tel
    },
    isReference,
    isReference => {
      "contacts": workshopsReferences[] -> {
        "name": address.street,
        tel
      }
    },
    !isReference => {
      contacts[]{
        name,
        tel
      }
    }
  }
`;
