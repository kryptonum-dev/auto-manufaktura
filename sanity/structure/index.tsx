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
    ]);
