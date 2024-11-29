import type { StructureResolver } from 'sanity/structure';
import { createSingleton } from '../utils/create-singleton';
import { createCollection } from '../utils/create-collection';

export const structure: StructureResolver = S =>
  S.list()
    .id('root')
    .title('Zawartość')
    .items([
      createSingleton(S, 'global'),
      createCollection(S, 'Workshop_Collection'),
      S.divider(),
      createSingleton(S, 'Index_Page'),
      S.divider(),
      createCollection(S, 'BlogCategory_Collection'),
      createCollection(S, 'BlogPost_Collection'),
      S.divider(),
      createCollection(S, 'Service_Collection'),
      createCollection(S, 'CarBrand_Collection'),
      createCollection(S, 'Location_Collection'),
      S.divider(),
      createCollection(S, 'Faq_Collection'),
      createCollection(S, 'Review_Collection'),
    ]);
