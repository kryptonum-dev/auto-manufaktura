import type { PortableTextBlock } from 'next-sanity';

export type TopBarTypes = {
  isReference: boolean;
  contacts: {
    name: string;
    tel: string;
  }[];
  annotation?: PortableTextBlock[];
  additionalContact?: {
    name: string;
    tel: string;
  };
};
