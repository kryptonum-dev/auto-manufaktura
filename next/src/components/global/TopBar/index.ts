import { PortableText_Query } from '@/components/ui/TextBlock';

import TopBar from './TopBar';
export default TopBar;
export type { TopBarTypes } from './TopBar.types';

export const TopBar_Query = /* groq */ `
  *[_id == "global"][0].topBar {
    ${PortableText_Query('annotation')},
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
