import type { PortableTextBlock } from 'next-sanity';

export type TopBarTypes = {
  contacts: {
    address: string;
    tel: string;
  }[];
  annotation?: PortableTextBlock[];
  additionalContact?: {
    fullName: string;
    tel: string;
  };
};
