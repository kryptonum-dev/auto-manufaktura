import { defineType } from 'sanity';

import CarBrandsList from './components/CarBrandsList';

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Komponenty',
  of: [CarBrandsList],
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
