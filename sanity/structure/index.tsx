import type { StructureResolver } from 'sanity/structure';
import { createSingleton } from '../utils/create-singleton';

export const structure: StructureResolver = S =>
  S.list()
    .id('root')
    .title('Zawartość')
    .items([createSingleton(S, 'global'), S.divider(), createSingleton(S, 'Index_Page')]);
