import { defineType } from 'sanity';

import CarBrandsList from './components/CarBrandsList';
import FullServicesList from './components/FullServicesList';

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Komponenty',
  of: [CarBrandsList, FullServicesList],
  options: {
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        {
          name: 'grid',
          previewImageUrl: schemaTypeName => `/static/components/${schemaTypeName}.webp`,
        },
        { name: 'list' },
      ],
    },
  },
});
