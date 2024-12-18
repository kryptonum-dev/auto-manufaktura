export type ScrollNavigationTypes = {
  initialActiveSection: string;
  headings: {
    slug: string;
    text: string;
  }[];
  navAriaLabel: string;
  sectionSelector: string;
  threshold?: number;
  className?: string;
};
