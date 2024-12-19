type LinkType = {
  name: string;
  path: string;
};

export type FooterQueryTypes = {
  services: (LinkType & { list: LinkType[] })[];
  carBrands: LinkType[];
  locations: LinkType[];
  blogPage: LinkType;
  aboutPage: LinkType;
  contactPage: LinkType;
  pricingPage: LinkType;
  careerPage: LinkType & { isHiring: boolean };
};
