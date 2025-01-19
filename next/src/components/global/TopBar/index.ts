import { PortableTextQuery } from '@/components/ui/TextBlock';

import TopBar from './TopBar';
export default TopBar;
export type { TopBarTypes } from './TopBar.types';

export const TopBarQuery = `
  *[_id == "global"][0].topBar {
    ${PortableTextQuery('annotation')},
    additionalContact->{
      fullName,
      tel
    },
    "contacts": workshopsReferences[]->{
      "address": address.street,
      tel
    }
  }
`;
