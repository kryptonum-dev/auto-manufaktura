/**
 * Array of objects defining the types of documents that can be linked internally.
 * Each object contains a 'type' property specifying the document type.
 *
 * @type {{type: string}[]}
 */
export const InternalLinkableTypes: { type: string }[] = [
  { type: 'Index_Page' },
  { type: 'About_Page' },
  { type: 'Pricing_Page' },
  { type: 'Career_Page' },
  { type: 'Blog_Page' },
  { type: 'Contact_Page' },
  { type: 'PrivacyPolicy_Page' },
  { type: 'CarBrand_Collection' },
  { type: 'Service_Collection' },
  { type: 'Location_Collection' },
  { type: 'BlogPost_Collection' },
];
