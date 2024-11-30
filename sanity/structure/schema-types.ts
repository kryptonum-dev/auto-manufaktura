// Single Types
import global from '../schema/singleTypes/global';
import Index_Page from '../schema/singleTypes/Index_Page';
import Blog_Page from '../schema/singleTypes/Blog_Page';
import Contact_Page from '../schema/singleTypes/Contact_Page';
import About_Page from '../schema/singleTypes/About_Page';
import Pricing_Page from '../schema/singleTypes/Pricing_Page';
import Career_Page from '../schema/singleTypes/Career_Page';
import PrivacyPolicy_Page from '../schema/singleTypes/PrivacyPolicy_Page';

const singleTypes = [
  global,
  Index_Page,
  Blog_Page,
  Contact_Page,
  About_Page,
  Pricing_Page,
  Career_Page,
  PrivacyPolicy_Page,
];

// Collections Types
import Workshop_Collection from '../schema/collectionTypes/Workshop_Collection';
import Faq_Collection from '../schema/collectionTypes/Faq_Collection';
import Review_Collection from '../schema/collectionTypes/Review_Collection';
import CarBrand_Collection from '../schema/collectionTypes/CarBrand_Collection';
import Location_Collection from '../schema/collectionTypes/Location_Collection';
import Service_Collection from '../schema/collectionTypes/Service_Collection';
import BlogCategory_Collection from '../schema/collectionTypes/BlogCategory_Collection';
import BlogPost_Collection from '../schema/collectionTypes/BlogPost_Collection';

const collectionTypes = [
  Workshop_Collection,
  Faq_Collection,
  Review_Collection,
  CarBrand_Collection,
  Location_Collection,
  Service_Collection,
  BlogCategory_Collection,
  BlogPost_Collection,
];

// Components
import Components from '../schema/Components';

const components = [Components];

// UI Components
import cta from '../schema/ui/cta';
import seo from '../schema/ui/seo';
import PortableText from '../schema/ui/portable-text';
import Heading from '../schema/ui/portable-text/Heading';

const ui = [seo, cta, PortableText, Heading];

export const schemaTypes = [...singleTypes, ...collectionTypes, ...components, ...ui];

export const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
export const singletonTypes = new Set(singleTypes.map(type => type.name as string));
