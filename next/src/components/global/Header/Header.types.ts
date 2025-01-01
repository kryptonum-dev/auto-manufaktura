import type { TopBarTypes } from '@/components/global/TopBar';
import type { ImgDataTypes } from '@/components/ui/Img';

type LinkType = {
  name: string;
  path: string;
};

type NavQueryTypes = {
  services: (LinkType & { image: ImgDataTypes; list: (LinkType & { image: ImgDataTypes })[] })[];
  carBrands: (LinkType & { image: ImgDataTypes })[];
  blogPage: LinkType;
  aboutPage: LinkType;
  contactPage: LinkType;
  pricingPage: LinkType;
  careerPage: LinkType;
};

export type HeaderQueryTypes = {
  topBar: TopBarTypes;
  nav: NavQueryTypes;
};

export type HeaderPropsTypes = {
  logo: React.ReactNode;
  dropdownIcon: React.ReactNode;
  nav: NavQueryTypes;
};
